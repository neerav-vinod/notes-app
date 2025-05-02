'use client';

import { HiOutlineTrash } from "react-icons/hi";
import { useRouter } from "next/navigation";

type BtnProps = {
  id: string;
};

export default function RemoveBtn({ id }: BtnProps) {
  const router = useRouter();

  const removeTopic = async () => {
    const confirmed = confirm('Are you sure?');
    if (confirmed) {
      try {
        const res = await fetch(`/api/topics?id=${id}`, {
          method: "DELETE",
        });
        if (res.ok) {
          router.refresh(); // Or router.push('/topics') if navigating
        } else {
          throw new Error("Failed to delete");
        }
      } catch (error) {
        console.error("Delete error:", error);
      }
    }
  };

  return (
    <button onClick={removeTopic} className="text-red-400">
      <HiOutlineTrash size={24} />
    </button>
  );
}
