"use client"
import React, { useEffect, useState } from "react"
import creditsData from "../../lib/credits.json"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs"
import { Download, IdCard, List, Search } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Badge } from "../ui/badge"
import { Button } from "../ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { Input } from "../ui/input"
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import jsPDF from "jspdf"

interface Credit {
    unic_id: string
    project_name: string
    vintage: number
    status: string
}

const CreditsDashboard = () => {
    const [currentPage, setCurrentPage] = useState(1)
    const [sortedCredits, setSortedCredits] = useState<Credit[]>(creditsData)
    const [selectedType, setSelectedType] = useState("all")
    const [query, setQuery] = useState("")
    const [searchQuery, setSearchQuery] = useState("")
    const [selectedCredit, setSelectedCredit] = useState<Credit | null>(null)
    const [dialogOpen, setDialogOpen] = useState(false)
    const [sortBy, setSortBy] = useState("")
    const [order, setOrder] = useState("")

    const total = sortedCredits.length
    let perPage = 9
    const totalPage = Number((total / perPage).toFixed())
    const lastPage = totalPage > total / perPage ? totalPage : totalPage + 1

    const today = new Date()
    const formatedDate = today.toLocaleDateString("en-US", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
    })

    // debounce search
    useEffect(() => {
        const timer = setTimeout(() => {
            setQuery(searchQuery.toLowerCase())
        }, 500)
        return () => clearTimeout(timer)
    }, [searchQuery])

    useEffect(() => {
        let filteredData = creditsData
        if (selectedType === "all") {
            setSortedCredits(filteredData)
        } else {
            filteredData = filteredData.filter(
                (credit) => credit.status.toLowerCase() === selectedType
            )
        }

        if (query.trim()) {
            filteredData = filteredData.filter(
                (credit) =>
                    credit.project_name.toLowerCase().includes(query) ||
                    credit.vintage.toString().includes(query)
            )
        }

        setSortedCredits(filteredData)
        setCurrentPage(1)
    }, [selectedType, query])

    useEffect(() => {
        let filteredData = [...creditsData];

        if (sortBy === "project_name") {
            filteredData.sort((a, b) => {
                const result = a.project_name.localeCompare(b.project_name.toLowerCase()); // compare alphabetically
                return order === "asc" ? result : -result;
            })
        } else if (sortBy === "vintage") {
            filteredData.sort((a, b) => {
                const result = a.vintage - b.vintage;
                return order === "asc" ? result : -result;
            })
        }

        setSortedCredits(filteredData)
    }, [sortBy, order])

    // Download Certificate
    const downloadCertificate = (credit: Credit, type: "html" | "pdf") => {
        const timestamp = new Date().toLocaleString()
        const content = `
      <h1>Retirement Certificate</h1>
      <p><strong>UNIC ID:</strong> ${credit.unic_id}</p>
      <p><strong>Project Name:</strong> ${credit.project_name}</p>
      <p><strong>Vintage:</strong> ${credit.vintage}</p>
      <p><strong>Status:</strong> ${credit.status}</p>
      <p><strong>Timestamp:</strong> ${timestamp}</p>
    `

        if (type === "html") {
            const blob = new Blob([content], { type: "text/html" })
            const link = document.createElement("a")
            link.href = URL.createObjectURL(blob)
            link.download = `certificate-${credit.unic_id}.html`
            link.click()
        } else {
            const doc = new jsPDF()
            doc.setFontSize(16)
            doc.text("Retirement Certificate", 20, 20)
            doc.setFontSize(12)
            doc.text(`UNIC ID: ${credit.unic_id}`, 20, 40)
            doc.text(`Project Name: ${credit.project_name}`, 20, 50)
            doc.text(`Vintage: ${credit.vintage}`, 20, 60)
            doc.text(`Status: ${credit.status}`, 20, 70)
            doc.text(`Timestamp: ${timestamp}`, 20, 80)
            doc.save(`certificate-${credit.unic_id}.pdf`)
        }
        setDialogOpen(false)
    }

    return (
        <div className="p-4 space-y-6">
            <div>
                <h1 className="text-2xl font-semibold">Dashboard</h1>
                <p className="text-muted-foreground text-sm">{formatedDate}</p>
            </div>

            <Tabs defaultValue="card">
                <div className="w-full flex items-center justify-between">
                    <TabsList className="mb-3 h-auto -space-x-px bg-background/30 p-0 shadow-sm shadow-black/5 rtl:space-x-reverse">
                        <TabsTrigger
                            value="card"
                            className="relative overflow-hidden rounded-none border border-border py-2 after:pointer-events-none after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 first:rounded-s last:rounded-e data-[state=active]:bg-muted data-[state=active]:after:bg-primary"
                        >
                            <IdCard
                                className="-ms-0.5 me-1.5 opacity-60"
                                size={16}
                                strokeWidth={2}
                                aria-hidden="true"
                            />
                            Overview
                        </TabsTrigger>
                        <TabsTrigger
                            value="list"
                            className="relative overflow-hidden rounded-none border border-border py-2 after:pointer-events-none after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 first:rounded-s last:rounded-e data-[state=active]:bg-muted data-[state=active]:after:bg-primary"
                        >
                            <List
                                className="-ms-0.5 me-1.5 opacity-60"
                                size={16}
                                strokeWidth={2}
                                aria-hidden="true"
                            />
                            Projects
                        </TabsTrigger>
                    </TabsList>

                    <div className="flex items-center gap-4">
                        <div className="flex items-center max-w-md border rounded-md overflow-hidden bg-background">
                            <div className="pl-4 pr-2 py-1">
                                <Search className="w-5 h-5 text-muted-foreground" />
                            </div>
                            <Input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search..."
                                className="flex-1 border-0 shadow-none bg-transparent focus-visible:ring-0 px-2 py-1"
                            />
                        </div>
                        <Select onValueChange={setSelectedType}>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="All" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All</SelectItem>
                                <SelectItem value="active">Active</SelectItem>
                                <SelectItem value="retired">Retired</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                {/* Card View */}
                <TabsContent value="card">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {sortedCredits
                            .slice(perPage * (currentPage - 1), perPage * currentPage)
                            .map((credit) => (
                                <Card key={credit.unic_id}>
                                    <CardHeader className="flex justify-between">
                                        <div>
                                            <CardTitle>{credit.project_name}</CardTitle>
                                            <Badge
                                                className={`${credit.status.toLowerCase() === "active"
                                                    ? "bg-green-500"
                                                    : "bg-gray-400"
                                                    }`}
                                            >
                                                {credit.status}
                                            </Badge>
                                        </div>
                                        <Button
                                            size="icon"
                                            variant="secondary"
                                            onClick={() => {
                                                setSelectedCredit(credit)
                                                setDialogOpen(true)
                                            }}
                                        >
                                            <Download />
                                        </Button>
                                    </CardHeader>
                                    <CardContent>
                                        <p>Vintage: {credit.vintage}</p>
                                        <p>ID: {credit.unic_id}</p>
                                    </CardContent>
                                </Card>
                            ))}
                    </div>
                </TabsContent>

                {/* Table View */}
                <TabsContent value="list">
                    <Table className="border">
                        <TableCaption>A list of your recent credits.</TableCaption>
                        <TableHeader className="bg-secondary/50">
                            <TableRow>
                                <TableHead className="w-[100px]">UNIC ID</TableHead>
                                <TableHead onClick={() => {
                                    setSortBy("project_name")
                                    order === "asc" ? setOrder("desc") : setOrder("asc")
                                }}>Project Name</TableHead>
                                <TableHead onClick={() => {
                                    setSortBy("vintage")
                                    order === "asc" ? setOrder("desc") : setOrder("asc")
                                }}>Vintage</TableHead>
                                <TableHead className="text-right">Status</TableHead>
                                <TableHead className="text-right">Certificate</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {sortedCredits
                                .slice(perPage * (currentPage - 1), perPage * currentPage)
                                .map((credit) => (
                                    <TableRow key={credit.unic_id}>
                                        <TableCell className="font-medium">
                                            {credit.unic_id}
                                        </TableCell>
                                        <TableCell>{credit.project_name}</TableCell>
                                        <TableCell>{credit.vintage}</TableCell>
                                        <TableCell className="text-right">
                                            <Badge
                                                className={`${credit.status.toLowerCase() === "active"
                                                    ? "bg-green-500"
                                                    : "bg-gray-400"
                                                    }`}
                                            >
                                                {credit.status}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <Button
                                                size="icon"
                                                variant="secondary"
                                                onClick={() => {
                                                    setSelectedCredit(credit)
                                                    setDialogOpen(true)
                                                }}
                                            >
                                                <Download />
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                        </TableBody>
                    </Table>
                </TabsContent>
            </Tabs>

            {/* Navigation */}
            <div className="flex justify-end">
                <div className="flex gap-4 items-center">
                    <Button
                        disabled={currentPage === 1}
                        onClick={() => setCurrentPage((prev) => prev - 1)}
                    >
                        Previous
                    </Button>
                    <span>
                        {currentPage} of {lastPage}
                    </span>
                    <Button
                        disabled={currentPage === lastPage}
                        onClick={() => setCurrentPage((prev) => prev + 1)}
                    >
                        Next
                    </Button>
                </div>
            </div>

            {/* Dialog */}
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Download Retirement Certificate</DialogTitle>
                        <DialogDescription>
                            Choose a format to download certificate for{" "}
                            <strong>{selectedCredit?.project_name}</strong>
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter className="flex gap-3">
                        <Button
                            onClick={() =>
                                selectedCredit && downloadCertificate(selectedCredit, "html")
                            }
                        >
                            Download as HTML
                        </Button>
                        <Button
                            onClick={() =>
                                selectedCredit && downloadCertificate(selectedCredit, "pdf")
                            }
                        >
                            Download as PDF
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default CreditsDashboard