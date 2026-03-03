import { useRef, useState } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "convex/_generated/api";
import { useToast } from "./ToastProvider";
import { Id } from "convex/_generated/dataModel";

interface AvatarUploadProps {
    size?: "md" | "lg" | "xl";
}

export function AvatarUpload({ size = "lg" }: AvatarUploadProps) {
    const user = useQuery(api.users.viewer);
    const generateUploadUrl = useMutation(api.users.generateUploadUrl);
    const updateProfile = useMutation(api.users.updateProfile);
    const { success, error, info } = useToast();

    const fileInputRef = useRef<HTMLInputElement>(null);
    const [isUploading, setIsUploading] = useState(false);

    // Derive initials if no avatar is set
    const getInitials = () => {
        if (!user) return "U";
        return (user.name || user.email || "U")
            .split(/[\s@]/)
            .map((n: string) => n[0])
            .filter(Boolean)
            .join("")
            .toUpperCase()
            .slice(0, 2);
    };

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Basic validation
        if (!file.type.startsWith("image/")) {
            error("Please select an image file.");
            return;
        }

        if (file.size > 5 * 1024 * 1024) {
            error("Image must be smaller than 5MB.");
            return;
        }

        setIsUploading(true);
        info("Uploading avatar...");

        try {
            // 1. Get short-lived upload URL from Convex
            const postUrl = await generateUploadUrl();

            // 2. POST the file to the URL
            const result = await fetch(postUrl, {
                method: "POST",
                headers: { "Content-Type": file.type },
                body: file,
            });

            if (!result.ok) throw new Error("Upload failed");

            const { storageId } = await result.json();

            // 3. Save the newly allocated storage id to the user profile
            await updateProfile({
                name: user?.name ?? "",
                bio: user?.bio ?? "",
                avatarStorageId: storageId as Id<"_storage">,
            });

            success("Avatar updated successfully!");
        } catch (err) {
            console.error(err);
            error("Failed to upload avatar. Please try again.");
        } finally {
            setIsUploading(false);
            if (fileInputRef.current) {
                fileInputRef.current.value = ""; // Reset input
            }
        }
    };

    const handleClick = () => {
        if (isUploading) return;
        fileInputRef.current?.click();
    };

    if (!user) return <div className={`avatar avatar--${size} pulse-anim`} />;

    return (
        <div className="avatar-upload-wrapper" onClick={handleClick}>
            <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/*"
                style={{ display: "none" }}
            />
            <div className={`avatar avatar--${size} ${isUploading ? 'avatar--uploading' : ''}`}>
                {user.avatarUrl ? (
                    <img src={user.avatarUrl} alt="User Avatar" />
                ) : (
                    <span>{getInitials()}</span>
                )}

                <div className="avatar-overlay">
                    <span className="avatar-overlay-icon">📷</span>
                </div>
            </div>
            {isUploading && (
                <div className="avatar-spinner" />
            )}
        </div>
    );
}
