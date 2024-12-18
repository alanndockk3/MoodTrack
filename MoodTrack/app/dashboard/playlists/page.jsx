"use client";

import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Button,
} from "@nextui-org/react";
import usePlaylistStore from "@/store/usePlaylistStore";

export default function PlaylistsPage() {
  const { likedPlaylists, fetchLikedPlaylists, removeLikedPlaylist } =
    usePlaylistStore();

  // Fetch liked playlists on component mount
  React.useEffect(() => {
    fetchLikedPlaylists();
  }, [fetchLikedPlaylists]);

  const handleDelete = async (playlistId) => {
    try {
      await removeLikedPlaylist(playlistId);
    } catch (error) {
      console.error("Error deleting playlist:", error);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Your Liked Playlists</h1>
      <Table
        aria-label="Liked Playlists"
        bordered
        css={{
          height: "auto",
          minWidth: "100%",
        }}
      >
        <TableHeader>
          <TableColumn>Name</TableColumn>
          <TableColumn>Description</TableColumn>
          <TableColumn>Actions</TableColumn>
        </TableHeader>
        <TableBody>
          {likedPlaylists.map((playlist) => (
            <TableRow key={playlist.id}>
              <TableCell>
                <a
                  href={playlist.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  {playlist.name}
                </a>
              </TableCell>
              <TableCell>
                {playlist.description || "No description available"}
              </TableCell>
              <TableCell>
                <Button
                  color="error"
                  size="sm"
                  onClick={() => handleDelete(playlist.id)}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
