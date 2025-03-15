-- CreateTable
CREATE TABLE "_OptionToQuestion" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_OptionToQuestion_A_fkey" FOREIGN KEY ("A") REFERENCES "Option" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_OptionToQuestion_B_fkey" FOREIGN KEY ("B") REFERENCES "Question" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Option" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "question_id" TEXT NOT NULL,
    "option" TEXT NOT NULL
);
INSERT INTO "new_Option" ("id", "option", "question_id") SELECT "id", "option", "question_id" FROM "Option";
DROP TABLE "Option";
ALTER TABLE "new_Option" RENAME TO "Option";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "_OptionToQuestion_AB_unique" ON "_OptionToQuestion"("A", "B");

-- CreateIndex
CREATE INDEX "_OptionToQuestion_B_index" ON "_OptionToQuestion"("B");
