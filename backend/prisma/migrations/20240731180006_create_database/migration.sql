-- CreateTable
CREATE TABLE "User" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "censoredMusics" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Playlist" (
    "id" UUID NOT NULL,
    "userId" UUID NOT NULL,
    "title" TEXT NOT NULL,

    CONSTRAINT "Playlist_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Artist" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "biography" TEXT NOT NULL,

    CONSTRAINT "Artist_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Album" (
    "id" UUID NOT NULL,
    "title" TEXT NOT NULL,

    CONSTRAINT "Album_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Music" (
    "id" UUID NOT NULL,
    "albumId" UUID NOT NULL,
    "title" TEXT NOT NULL,
    "youtubeUrl" TEXT NOT NULL,
    "iconUrl" TEXT NOT NULL,

    CONSTRAINT "Music_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Verse" (
    "id" UUID NOT NULL,
    "startTime" INTEGER NOT NULL,
    "endTime" INTEGER NOT NULL,
    "text" TEXT NOT NULL,
    "translatedText" TEXT,
    "musicId" UUID NOT NULL,

    CONSTRAINT "Verse_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MusicAccess" (
    "ip" TEXT NOT NULL,
    "musicId" UUID NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MusicAccess_pkey" PRIMARY KEY ("ip","date","musicId")
);

-- CreateTable
CREATE TABLE "_UsersLikedPlaylists" (
    "A" UUID NOT NULL,
    "B" UUID NOT NULL
);

-- CreateTable
CREATE TABLE "_AlbumArtists" (
    "A" UUID NOT NULL,
    "B" UUID NOT NULL
);

-- CreateTable
CREATE TABLE "_PlaylistMusics" (
    "A" UUID NOT NULL,
    "B" UUID NOT NULL
);

-- CreateTable
CREATE TABLE "_UsersLikedMusics" (
    "A" UUID NOT NULL,
    "B" UUID NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_UsersLikedPlaylists_AB_unique" ON "_UsersLikedPlaylists"("A", "B");

-- CreateIndex
CREATE INDEX "_UsersLikedPlaylists_B_index" ON "_UsersLikedPlaylists"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_AlbumArtists_AB_unique" ON "_AlbumArtists"("A", "B");

-- CreateIndex
CREATE INDEX "_AlbumArtists_B_index" ON "_AlbumArtists"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_PlaylistMusics_AB_unique" ON "_PlaylistMusics"("A", "B");

-- CreateIndex
CREATE INDEX "_PlaylistMusics_B_index" ON "_PlaylistMusics"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_UsersLikedMusics_AB_unique" ON "_UsersLikedMusics"("A", "B");

-- CreateIndex
CREATE INDEX "_UsersLikedMusics_B_index" ON "_UsersLikedMusics"("B");

-- AddForeignKey
ALTER TABLE "Playlist" ADD CONSTRAINT "Playlist_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Music" ADD CONSTRAINT "Music_albumId_fkey" FOREIGN KEY ("albumId") REFERENCES "Album"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Verse" ADD CONSTRAINT "Verse_musicId_fkey" FOREIGN KEY ("musicId") REFERENCES "Music"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MusicAccess" ADD CONSTRAINT "MusicAccess_musicId_fkey" FOREIGN KEY ("musicId") REFERENCES "Music"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UsersLikedPlaylists" ADD CONSTRAINT "_UsersLikedPlaylists_A_fkey" FOREIGN KEY ("A") REFERENCES "Playlist"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UsersLikedPlaylists" ADD CONSTRAINT "_UsersLikedPlaylists_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AlbumArtists" ADD CONSTRAINT "_AlbumArtists_A_fkey" FOREIGN KEY ("A") REFERENCES "Album"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AlbumArtists" ADD CONSTRAINT "_AlbumArtists_B_fkey" FOREIGN KEY ("B") REFERENCES "Artist"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PlaylistMusics" ADD CONSTRAINT "_PlaylistMusics_A_fkey" FOREIGN KEY ("A") REFERENCES "Music"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PlaylistMusics" ADD CONSTRAINT "_PlaylistMusics_B_fkey" FOREIGN KEY ("B") REFERENCES "Playlist"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UsersLikedMusics" ADD CONSTRAINT "_UsersLikedMusics_A_fkey" FOREIGN KEY ("A") REFERENCES "Music"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UsersLikedMusics" ADD CONSTRAINT "_UsersLikedMusics_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
