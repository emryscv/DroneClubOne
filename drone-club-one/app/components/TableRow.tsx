"use client"
import { useRouter } from "next/navigation";
import { LeaderbaordEntryType } from "../data/types"

export default function TableRow({ data }: { data: LeaderbaordEntryType }) {
    const router = useRouter();

    return <tr className="border-b border-border last:border-b-0 hover:bg-secondary/50 transition-colors cursor-pointer" onClick={() => { router.push(`/pilots/${data.id}`) }}>
        <td className={`${data.position === 1 ? "text-accent" : ""} text-center p-4 `}>{data.position}</td>
        <td className="p-4 max-sm:flex max-sm:flex-col">
            <span className="font-bold">{`${data.nickname} `}</span>
            <span className="text-muted-foreground">{`(${data.firstname}${data.middlename ? " " + data.middlename : ""} ${data.lastname})`}</span>
        </td>
        <td className="font-mono text-center p-4">{data.time}</td>
        <td className="text-center p-4">{data.crashes}</td>
    </tr >
}