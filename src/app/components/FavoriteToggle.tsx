"use client";

import { useFavoritesStore } from "../store/favoritesStore";

type Props = {
    latitude: number;
    longitude: number;
    location: string;
}

export default function FavoriteToggle({ latitude, longitude, location }: Props) {
    const { addFavorite, removeFavorite, isFavorite } = useFavoritesStore();
    const favorite = isFavorite(location);

    const toggleFavorite = () => {
        if (favorite) {
            removeFavorite(location);
        } else {
            addFavorite({ latitude, longitude, location });
        }
    };

    return (
        <div
            onClick={toggleFavorite}
            className="absolute top-6 right-6 cursor-pointer z-10 transition-colors"
        >
            {favorite ? (
                // ⭐ Ícono relleno
                <svg
                    fill="currentColor"
                    className="size-6 text-yellow-500"
                    viewBox="0 0 36 36"
                    version="1.1"
                    preserveAspectRatio="xMidYMid meet"
                >
                    <title>favorite-solid</title>
                    <path d="M34,16.78a2.22,2.22,0,0,0-1.29-4l-9-.34a.23.23,0,0,1-.2-.15L20.4,3.89a2.22,2.22,0,0,0-4.17,0l-3.1,8.43a.23.23,0,0,1-.2.15l-9,.34a2.22,2.22,0,0,0-1.29,4l7.06,5.55a.23.23,0,0,1,.08.24L7.35,31.21a2.22,2.22,0,0,0,3.38,2.45l7.46-5a.22.22,0,0,1,.25,0l7.46,5a2.2,2.2,0,0,0,2.55,0,2.2,2.2,0,0,0,.83-2.4l-2.45-8.64a.22.22,0,0,1,.08-.24Z"></path>
                    <rect x="0" y="0" width="36" height="36" fillOpacity="0" />
                </svg>
            ) : (
                // ☆ Ícono vacío
                <svg
                    fill="currentColor"
                    className="size-6 text-neutral-200 hover:text-yellow-400 transition-colors"
                    viewBox="0 0 36 36"
                    version="1.1"
                    preserveAspectRatio="xMidYMid meet"
                >
                    <title>favorite-line</title>
                    <path d="M27.19,34a2.22,2.22,0,0,1-1.24-.38l-7.46-5a.22.22,0,0,0-.25,0l-7.46,5A2.22,2.22,0,0,1,7.4,31.21l2.45-8.64a.23.23,0,0,0-.08-.24L2.71,16.78a2.22,2.22,0,0,1,1.29-4l9-.34a.23.23,0,0,0,.2-.15l3.1-8.43a2.22,2.22,0,0,1,4.17,0l3.1,8.43a.23.23,0,0,0,.2.15l9,.34a2.22,2.22,0,0,1,1.29,4L27,22.33a.22.22,0,0,0-.08.24l2.45,8.64A2.23,2.23,0,0,1,27.19,34Zm-8.82-7.42A2.21,2.21,0,0,1,19.6,27l7.46,5a.22.22,0,0,0,.34-.25l-2.45-8.64a2.21,2.21,0,0,1,.77-2.35l7.06-5.55a.22.22,0,0,0-.13-.4l-9-.34a2.22,2.22,0,0,1-2-1.46l-3.1-8.43a.22.22,0,0,0-.42,0L15.06,13a2.22,2.22,0,0,1-2,1.46l-9,.34a.22.22,0,0,0-.13.4L11,20.76a2.22,2.22,0,0,1,.77,2.35L9.33,31.75a.21.21,0,0,0,.08.24.2.2,0,0,0,.26,0l7.46-5A2.22,2.22,0,0,1,18.36,26.62Z"></path>
                    <rect x="0" y="0" width="36" height="36" fillOpacity="0" />
                </svg>
            )}
        </div>
    );
}
