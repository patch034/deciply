-- Admin-managed content staging layer.
CREATE TABLE "AdminContent" (
  "id" TEXT NOT NULL PRIMARY KEY,
  "type" TEXT NOT NULL,
  "slug" TEXT NOT NULL,
  "locale" TEXT NOT NULL DEFAULT 'tr',
  "title" TEXT NOT NULL,
  "status" TEXT NOT NULL DEFAULT 'DRAFT',
  "featured" BOOLEAN NOT NULL DEFAULT false,
  "payload" TEXT NOT NULL DEFAULT '{}',
  "relations" TEXT NOT NULL DEFAULT '{}',
  "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" DATETIME NOT NULL
);

CREATE UNIQUE INDEX "AdminContent_type_slug_locale_key" ON "AdminContent"("type", "slug", "locale");
CREATE INDEX "AdminContent_type_status_idx" ON "AdminContent"("type", "status");
CREATE INDEX "AdminContent_locale_idx" ON "AdminContent"("locale");
