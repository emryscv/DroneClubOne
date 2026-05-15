"use client"
import { useRouter } from "next/navigation";
import { LeaderbaordEntryType } from "../data/types"
import Image from "next/image";

export default function TableRow({ data }: { data: LeaderbaordEntryType }) {
    const router = useRouter();

    return <tr className="border-b border-border last:border-b-0 hover:bg-secondary/50 transition-colors cursor-pointer" onClick={() => { router.push(`/pilots/${data.id}`) }}>
        <td className={`${data.position === 1 ? "text-accent" : ""} text-center p-2`}>{data.position}</td>
        <td className="flex max-sm:flex-col items-center p-2">
            <Image
                src={data.pictureurl || "/default-avatar.png"}
                alt={`${data.nickname}'s profile picture`}
                width={40} height={40}
                className="w-10 h-10 rounded-full object-cover mr-4 max-sm:mb-2"
            />
            <span className="font-bold mr-1">{`${data.nickname} `}</span>
            <span className="text-muted-foreground">{`(${data.firstname}${data.middlename ? " " + data.middlename : ""} ${data.lastname})`}</span>
        </td>
        <td className="font-mono text-center p-2">{data.time}</td>
        <td className="text-center p-2">{data.crashes}</td>
    </tr >
}