import { getWorksheetsByCategory, getWorksheetCategoryById, deleteWorksheet } from "@/app/actions/worksheet";
import { notFound } from "next/navigation";
import Link from "next/link";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { DeleteWorksheetButton } from "@/components/delete-worksheet-button";
import { WorksheetCard } from "@/components/worksheet-card";

function getDriveFileInfo(url: string) {
    const match = url.match(/\/d\/([a-zA-Z0-9_-]+)/);
    if (!match) return null;
    const id = match[1];
    return {
        embedUrl: `https://drive.google.com/file/d/${id}/preview`,
        downloadUrl: `https://drive.google.com/uc?export=download&id=${id}`,
        thumbnailUrl: `https://drive.google.com/thumbnail?id=${id}&sz=w1000`,
    };
}

export default async function WorksheetListPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const category = await getWorksheetCategoryById(id);
    
    if (!category) {
        notFound();
    }

    const session = await auth.api.getSession({
        headers: await headers(),
    });
    const isAdmin = session?.user && (session.user as any).role === 'admin';

    const worksheets = await getWorksheetsByCategory(id);

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="mb-8 flex items-center justify-between">
                <div>
                    <Link href="/worksheet" className="text-sm text-primary hover:underline mb-2 block">
                        &larr; Kembali ke Kategori
                    </Link>
                    <h1 className="text-3xl font-bold">{category.name}</h1>
                </div>
                {isAdmin && (
                    <Link
                        href="/add-worksheet"
                        className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/90 text-sm font-medium"
                    >
                        + Tambah Worksheet
                    </Link>
                )}
            </div>

            {worksheets.length === 0 ? (
                <div className="text-center py-20 bg-gray-50 rounded-xl border-2 border-dashed">
                    <p className="text-gray-500">Belum ada worksheet di kategori ini.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {worksheets.map((worksheet) => {
                        const driveInfo = getDriveFileInfo(worksheet.driveUrl);
                        if (!driveInfo) return null;

                        return (
                            <WorksheetCard
                                key={worksheet.id}
                                title={worksheet.title}
                                embedUrl={driveInfo.embedUrl}
                                thumbnailUrl={driveInfo.thumbnailUrl}
                                downloadUrl={driveInfo.downloadUrl}
                                isAdmin={isAdmin}
                                deleteButton={
                                    <DeleteWorksheetButton 
                                        worksheetId={worksheet.id} 
                                        categoryId={id} 
                                        onDelete={deleteWorksheet} 
                                    />
                                }
                            />
                        );
                    })}
                </div>
            )}
        </div>
    );
}
