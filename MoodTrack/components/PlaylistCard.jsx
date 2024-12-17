"use client";

import { Card, CardHeader, CardBody, CardFooter, Button, Link } from "@nextui-org/react";

export default function PlaylistCard({ name, description, url, onLike, onDislike }) {
  const safeDescription = description ? description.substring(0, 35) : "No description available";

  return (
    <Card className="w-full shadow-lg">
      <CardHeader>
        <h3 className="text-lg font-bold">{name || "Unknown Playlist"}</h3>
      </CardHeader>
      <CardBody>
        <p className="text-gray-600">{safeDescription}...</p>
      </CardBody>
      <CardFooter className="flex justify-between">
        <Link href={url || "#"} target="_blank" rel="noopener noreferrer" color="primary">
          Listen on Spotify
        </Link>
        <div className="flex gap-2">
          <Button size="sm" color="success" onClick={onLike}>
            👍 Like
          </Button>
          <Button size="sm" color="danger" onClick={onDislike}>
            👎 Dislike
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
