"use server";

import { ContentStatus } from "@prisma/client";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

import { clearAdminSession, createAdminSession, isAdminAuthenticated, verifyAdminPassword } from "@/lib/admin-auth";
import {
  adminContentStatuses,
  adminContentTypes,
  adminPublishLocales,
  buildAdminPayloadFromForm,
  buildAdminRelationsFromForm,
  normalizeJsonText,
  slugifyAdminTitle
} from "@/lib/admin-content";
import { prisma } from "@/lib/db";

function requireEnumValue<T extends string>(allowed: readonly T[], value: FormDataEntryValue | null, field: string) {
  const normalized = String(value ?? "");

  if (!allowed.includes(normalized as T)) {
    throw new Error(`Invalid ${field}`);
  }

  return normalized as T;
}

async function requireAdmin() {
  if (!(await isAdminAuthenticated())) {
    redirect("/admin/login");
  }
}

export async function loginAdminAction(formData: FormData) {
  const password = String(formData.get("password") ?? "");

  if (!verifyAdminPassword(password)) {
    redirect("/admin/login?error=1");
  }

  await createAdminSession();
  redirect("/admin");
}

export async function logoutAdminAction() {
  await clearAdminSession();
  redirect("/admin/login");
}

export async function createAdminContentAction(formData: FormData) {
  await requireAdmin();

  const type = requireEnumValue(adminContentTypes, formData.get("type"), "type");
  const status = requireEnumValue(adminContentStatuses, formData.get("status") ?? ContentStatus.PUBLISHED, "status");
  const title = String(formData.get("title") ?? "").trim();
  const requestedSlug = String(formData.get("slug") ?? "").trim();
  const slug = requestedSlug || slugifyAdminTitle(title);

  if (!title) {
    throw new Error("Başlık zorunludur");
  }

  const payload = buildAdminPayloadFromForm(formData, type);
  const relations = buildAdminRelationsFromForm(formData);
  const featured = formData.get("featured") === "on";

  for (const locale of adminPublishLocales) {
    await prisma.adminContent.upsert({
      where: {
        type_slug_locale: {
          type,
          slug,
          locale
        }
      },
      create: {
        type,
        status,
        slug,
        title,
        locale,
        featured,
        payload,
        relations
      },
      update: {
        status,
        title,
        featured,
        payload,
        relations
      }
    });
  }

  revalidatePath("/admin");
}

export async function updateAdminContentGroupAction(formData: FormData) {
  await requireAdmin();

  const type = requireEnumValue(adminContentTypes, formData.get("type"), "type");
  const status = requireEnumValue(adminContentStatuses, formData.get("status") ?? ContentStatus.DRAFT, "status");
  const slug = String(formData.get("slug") ?? "").trim();
  const title = String(formData.get("title") ?? "").trim();

  if (!slug || !title) {
    throw new Error("Slug ve başlık zorunludur");
  }

  await prisma.adminContent.updateMany({
    where: { type, slug },
    data: {
      status,
      title,
      featured: formData.get("featured") === "on",
      payload: buildAdminPayloadFromForm(formData, type),
      relations: buildAdminRelationsFromForm(formData)
    }
  });

  revalidatePath("/admin");
}

export async function deleteAdminContentGroupAction(formData: FormData) {
  await requireAdmin();

  const type = requireEnumValue(adminContentTypes, formData.get("type"), "type");
  const slug = String(formData.get("slug") ?? "").trim();

  if (!slug) {
    throw new Error("Slug zorunludur");
  }

  await prisma.adminContent.deleteMany({ where: { type, slug } });
  revalidatePath("/admin");
}

export async function deleteAdminContentAction(formData: FormData) {
  await requireAdmin();

  const id = String(formData.get("id") ?? "");

  if (!id) {
    throw new Error("ID zorunludur");
  }

  await prisma.adminContent.delete({ where: { id } });
  revalidatePath("/admin");
}

export async function bulkImportAdminContentAction(formData: FormData) {
  await requireAdmin();

  const raw = String(formData.get("bulk") ?? "").trim();
  const parsed = JSON.parse(raw);

  if (!Array.isArray(parsed)) {
    throw new Error("Toplu import verisi JSON array olmalıdır");
  }

  for (const item of parsed) {
    const type = requireEnumValue(adminContentTypes, item.type, "type");
    const status = requireEnumValue(adminContentStatuses, item.status ?? ContentStatus.DRAFT, "status");
    const title = String(item.title ?? "").trim();
    const slug = String(item.slug ?? "").trim() || slugifyAdminTitle(title);
    const targetLocales = Array.isArray(item.locales) && item.locales.length ? item.locales : adminPublishLocales;

    if (!title) {
      throw new Error("Her toplu import kaydında başlık olmalıdır");
    }

    for (const locale of targetLocales) {
      await prisma.adminContent.upsert({
        where: {
          type_slug_locale: {
            type,
            slug,
            locale: String(locale)
          }
        },
        create: {
          type,
          status,
          slug,
          locale: String(locale),
          title,
          featured: Boolean(item.featured),
          payload: JSON.stringify(item.payload ?? {}, null, 2),
          relations: JSON.stringify(item.relations ?? {}, null, 2)
        },
        update: {
          status,
          title,
          featured: Boolean(item.featured),
          payload: JSON.stringify(item.payload ?? {}, null, 2),
          relations: JSON.stringify(item.relations ?? {}, null, 2)
        }
      });
    }
  }

  revalidatePath("/admin");
}

export async function updateAdminContentAction(formData: FormData) {
  await requireAdmin();

  const id = String(formData.get("id") ?? "");
  const status = requireEnumValue(adminContentStatuses, formData.get("status") ?? ContentStatus.DRAFT, "status");
  const title = String(formData.get("title") ?? "").trim();

  if (!id || !title) {
    throw new Error("ID ve başlık zorunludur");
  }

  await prisma.adminContent.update({
    where: { id },
    data: {
      status,
      title,
      featured: formData.get("featured") === "on",
      payload: normalizeJsonText(formData.get("payload")),
      relations: normalizeJsonText(formData.get("relations"))
    }
  });

  revalidatePath("/admin");
}
