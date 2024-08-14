-- CreateTable
CREATE TABLE "_UsersLikedArtists" (
    "A" UUID NOT NULL,
    "B" UUID NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_UsersLikedArtists_AB_unique" ON "_UsersLikedArtists"("A", "B");

-- CreateIndex
CREATE INDEX "_UsersLikedArtists_B_index" ON "_UsersLikedArtists"("B");

-- AddForeignKey
ALTER TABLE "_UsersLikedArtists" ADD CONSTRAINT "_UsersLikedArtists_A_fkey" FOREIGN KEY ("A") REFERENCES "Artist"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UsersLikedArtists" ADD CONSTRAINT "_UsersLikedArtists_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
