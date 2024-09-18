-- CreateTable
CREATE TABLE "Product" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "price" REAL NOT NULL,
    "barcode" TEXT NOT NULL,
    "stock" INTEGER NOT NULL,
    "time_added" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
