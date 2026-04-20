"use server";

import { AdminContentType, ContentStatus } from "@prisma/client";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

import { clearAdminSession, createAdminSession, isAdminAuthenticated, verifyAdminPassword } from "@/lib/admin-auth";
import { adminContentStatuses, adminContentTypes, normalizeJsonText } from "@/lib/admin-content";
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
  const status = requireEnumValue(adminContentStatuses, formData.get("status"), "status");
  const slug = String(formData.get("slug") ?? "").trim();
  const title = String(formData.get("title") ?? "").trim();
  const locale = String(formData.get("locale") ?? "tr").trim() || "tr";

  if (!slug || !title) {
    throw new Error("Slug and title are required");
  }

  await prisma.adminContent.create({
    data: {
      type,
      status,
      slug,
      title,
      locale,
      featured: formData.get("featured") === "on",
      payload: normalizeJsonText(formData.get("payload")),
      relations: normalizeJsonText(formData.get("relations"))
    }
  });

  revalidatePath("/admin");
}

export async function updateAdminContentAction(formData: FormData) {
  await requireAdmin();

  const id = String(formData.get("id") ?? "");
  const type = requireEnumValue(adminContentTypes, formData.get("type"), "type");
  const status = requireEnumValue(adminContentStatuses, formData.get("status"), "status");
  const slug = String(formData.get("slug") ?? "").trim();
  const title = String(formData.get("title") ?? "").trim();
  const locale = String(formData.get("locale") ?? "tr").trim() || "tr";

  if (!id || !slug || !title) {
    throw new Error("ID, slug and title are required");
  }

  await prisma.adminContent.update({
    where: { id },
    data: {
      type,
      status,
      slug,
      title,
      locale,
      featured: formData.get("featured") === "on",
      payload: normalizeJsonText(formData.get("payload")),
      relations: normalizeJsonText(formData.get("relations"))
    }
  });

  revalidatePath("/admin");
}

export async function deleteAdminContentAction(formData: FormData) {
  await requireAdmin();

  const id = String(formData.get("id") ?? "");

  if (!id) {
    throw new Error("ID is required");
  }

  await prisma.adminContent.delete({ where: { id } });
  revalidatePath("/admin");
}

export async function bulkImportAdminContentAction(formData: FormData) {
  await requireAdmin();

  const raw = String(formData.get("bulk") ?? "").trim();
  const parsed = JSON.parse(raw);

  if (!Array.isArray(parsed)) {
    throw new Error("Bulk payload must be a JSON array");
  }

  for (const item of parsed) {
    const type = requireEnumValue(adminContentTypes, item.type, "type");
    const status = requireEnumValue(adminContentStatuses, item.status ?? ContentStatus.DRAFT, "status");
    const slug = String(item.slug ?? "").trim();
    const title = String(item.title ?? "").trim();
    const locale = String(item.locale ?? "tr").trim() || "tr";

    if (!slug || !title) {
      throw new Error("Each bulk item needs slug and title");
    }

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

  revalidatePath("/admin");
}
