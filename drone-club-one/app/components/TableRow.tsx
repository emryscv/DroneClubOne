"use client"
import { useRouter } from "next/navigation";
import { LeaderbaordEntryType } from "../data/types"

export default function TableRow({ data }: { data: LeaderbaordEntryType }) {
    const router = useRouter();

    return <tr onClick={() => { router.push(`/pilots/${data.id}`) }}>
        <td>{data.position}</td>
        <td>{data.nickname}</td>
        <td>{data.firstname + (
            data.middlename ? " " + data.middlename : "")
            + " " + data.lastname
        }</td>
        <td>{data.time}</td>
        <td>{data.crashes}</td>
    </tr >
}