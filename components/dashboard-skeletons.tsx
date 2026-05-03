import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

// ========================
// USERS PAGE SKELETON
// ========================
export function UsersPageSkeleton() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-end">
        <Skeleton className="h-9 w-[120px] rounded-sm" />
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-3 gap-2">
        {Array.from({ length: 3 }).map((_, i) => (
          <Card key={i} className="border-none bg-neutral-100">
            <CardContent className="p-3 flex items-center gap-3">
              <Skeleton className="h-8 w-8 rounded-sm" />
              <div className="space-y-1.5">
                <Skeleton className="h-5 w-8" />
                <Skeleton className="h-2.5 w-16" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Search & Filters */}
      <div className="flex items-center gap-2">
        <Skeleton className="h-9 w-full max-w-sm rounded-sm" />
        <Skeleton className="h-9 w-[200px] rounded-sm" />
      </div>

      {/* Table */}
      <Card className="border-none bg-neutral-100">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-black/5">
                  {Array.from({ length: 7 }).map((_, i) => (
                    <th key={i} className="px-4 py-3">
                      <Skeleton className="h-2.5 w-16" />
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {Array.from({ length: 6 }).map((_, i) => (
                  <tr key={i} className="border-b border-black/5 last:border-0">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2.5">
                        <Skeleton className="h-8 w-8 rounded-full" />
                        <Skeleton className="h-3.5 w-24" />
                      </div>
                    </td>
                    <td className="px-4 py-3"><Skeleton className="h-3 w-20" /></td>
                    <td className="px-4 py-3"><Skeleton className="h-3 w-12" /></td>
                    <td className="px-4 py-3"><Skeleton className="h-3 w-28" /></td>
                    <td className="px-4 py-3"><Skeleton className="h-3 w-10" /></td>
                    <td className="px-4 py-3"><Skeleton className="h-5 w-14 rounded-full" /></td>
                    <td className="px-4 py-3"><Skeleton className="h-7 w-7 rounded-sm" /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// ========================
// HELPDESK PAGE SKELETON
// ========================
export function HelpdeskPageSkeleton() {
  return (
    <div className="flex flex-col gap-4">
      {/* Stats */}
      <div className="grid grid-cols-3 gap-2">
        {Array.from({ length: 3 }).map((_, i) => (
          <Card key={i} className="border-none bg-neutral-100">
            <CardContent className="p-3 text-center">
              <Skeleton className="h-5 w-8 mx-auto mb-1" />
              <Skeleton className="h-2.5 w-16 mx-auto" />
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Search & Filters */}
      <div className="flex items-center gap-2">
        <Skeleton className="h-9 w-full max-w-sm rounded-sm" />
        <Skeleton className="h-9 w-[280px] rounded-sm" />
      </div>

      {/* Ticket Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <Card key={i} className="border-none bg-neutral-100">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <Skeleton className="h-10 w-10 rounded-full shrink-0" />
                <div className="flex-1 min-w-0 space-y-2">
                  <div className="flex items-center justify-between">
                    <Skeleton className="h-3.5 w-32" />
                    <Skeleton className="h-7 w-7 rounded-sm" />
                  </div>
                  <Skeleton className="h-3 w-full" />
                  <Skeleton className="h-3 w-3/4" />
                  <div className="flex items-center justify-between pt-1">
                    <Skeleton className="h-2.5 w-24" />
                    <Skeleton className="h-4 w-16 rounded-full" />
                  </div>
                  <Skeleton className="h-2 w-40" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

// ========================
// BUILDINGS PAGE SKELETON
// ========================
export function BuildingsPageSkeleton() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-end">
        <Skeleton className="h-9 w-[140px] rounded-sm" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Buildings List */}
        <div className="space-y-2">
          <Skeleton className="h-3 w-24 mb-2" />
          <Skeleton className="h-8 w-full rounded-sm mb-1" />
          {Array.from({ length: 4 }).map((_, i) => (
            <Card key={i} className="border-none bg-neutral-100">
              <CardContent className="p-4 flex items-center gap-3">
                <Skeleton className="h-10 w-10 rounded-lg" />
                <div className="flex-1 min-w-0 space-y-1.5">
                  <Skeleton className="h-3.5 w-32" />
                  <Skeleton className="h-2.5 w-40" />
                </div>
                <div className="text-right space-y-1">
                  <Skeleton className="h-3 w-6 ml-auto" />
                  <Skeleton className="h-2.5 w-8 ml-auto" />
                </div>
                <Skeleton className="h-8 w-8 rounded-full" />
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Apartments Detail Placeholder */}
        <div className="lg:col-span-2">
          <div className="flex flex-col items-center justify-center min-h-[400px] border-2 border-dashed border-black/5 rounded-xl bg-neutral-50/50">
            <Skeleton className="h-10 w-10 rounded-sm mb-3" />
            <Skeleton className="h-4 w-48" />
          </div>
        </div>
      </div>
    </div>
  )
}

// ========================
// CHARGES PAGE SKELETON
// ========================
export function ChargesPageSkeleton() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-end">
        <Skeleton className="h-9 w-[160px] rounded-sm" />
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Card key={i} className="border-none bg-neutral-100">
            <CardContent className="p-4 flex items-center gap-4">
              <Skeleton className="h-9 w-9 rounded-sm" />
              <div className="space-y-1.5">
                <Skeleton className="h-5 w-16" />
                <Skeleton className="h-2.5 w-20" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Search & Filters */}
      <div className="flex flex-wrap items-center gap-2">
        <Skeleton className="h-9 w-full max-w-sm rounded-sm" />
        <Skeleton className="h-9 w-[180px] rounded-sm" />
        <Skeleton className="h-9 w-[240px] rounded-sm" />
      </div>

      {/* Table */}
      <Card className="border-none bg-neutral-100">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-black/5">
                  {Array.from({ length: 7 }).map((_, i) => (
                    <th key={i} className="px-4 py-3">
                      <Skeleton className="h-2.5 w-14" />
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {Array.from({ length: 6 }).map((_, i) => (
                  <tr key={i} className="border-b border-black/5 last:border-0">
                    <td className="px-4 py-3"><Skeleton className="h-3.5 w-24" /></td>
                    <td className="px-4 py-3"><Skeleton className="h-3 w-8" /></td>
                    <td className="px-4 py-3"><Skeleton className="h-3 w-24" /></td>
                    <td className="px-4 py-3"><Skeleton className="h-3 w-16" /></td>
                    <td className="px-4 py-3"><Skeleton className="h-5 w-14 rounded-full" /></td>
                    <td className="px-4 py-3"><Skeleton className="h-4 w-4 rounded-sm" /></td>
                    <td className="px-4 py-3">
                      <div className="flex gap-1">
                        <Skeleton className="h-7 w-16 rounded-sm" />
                        <Skeleton className="h-7 w-7 rounded-sm" />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// ========================
// DOCUMENTS PAGE SKELETON
// ========================
export function DocumentsPageSkeleton() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-end">
        <Skeleton className="h-9 w-[120px] rounded-sm" />
      </div>

      <Skeleton className="h-9 w-full max-w-sm rounded-sm" />

      {/* Document Groups */}
      {Array.from({ length: 3 }).map((_, i) => (
        <Card key={i} className="border-none bg-neutral-100">
          <CardHeader className="p-4 pb-2">
            <div className="flex items-center gap-2">
              <Skeleton className="h-7 w-7 rounded-lg" />
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-4 w-16 rounded-full ml-auto" />
            </div>
          </CardHeader>
          <CardContent className="p-4 pt-1">
            <div className="space-y-1.5">
              {Array.from({ length: 3 }).map((_, j) => (
                <div key={j} className="flex items-center justify-between py-2 px-2">
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <Skeleton className="h-4 w-4 rounded-sm" />
                    <div className="space-y-1">
                      <Skeleton className="h-3 w-40" />
                      <Skeleton className="h-2.5 w-24" />
                    </div>
                  </div>
                  <Skeleton className="h-7 w-7 rounded-sm" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

// ========================
// ANNOUNCEMENTS PAGE SKELETON
// ========================
export function AnnouncementsPageSkeleton() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-end">
        <Skeleton className="h-9 w-[160px] rounded-sm" />
      </div>

      <div className="space-y-3">
        {Array.from({ length: 4 }).map((_, i) => (
          <Card key={i} className="border-none bg-neutral-100">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <Skeleton className="h-8 w-8 rounded-lg shrink-0" />
                <div className="flex-1 min-w-0 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Skeleton className="h-3.5 w-40" />
                      <Skeleton className="h-4 w-12 rounded-full" />
                    </div>
                    <Skeleton className="h-7 w-7 rounded-sm" />
                  </div>
                  <Skeleton className="h-3 w-full" />
                  <Skeleton className="h-3 w-3/4" />
                  <Skeleton className="h-2.5 w-28" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

// ========================
// DASHBOARD PAGE SKELETON (Admin)
// ========================
export function DashboardPageSkeleton() {
  return (
    <div className="flex flex-col gap-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-1">
        <div className="space-y-1.5">
          <Skeleton className="h-7 w-56" />
          <Skeleton className="h-3 w-40" />
        </div>
        <Skeleton className="h-9 w-[140px] rounded-sm" />
      </div>

      {/* Stats Cards */}
      <div className="grid gap-2 grid-cols-2 md:grid-cols-3 xl:grid-cols-5">
        {Array.from({ length: 5 }).map((_, i) => (
          <Card key={i} className="overflow-hidden border-none bg-neutral-100">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1.5 pt-3.5 px-2">
              <Skeleton className="h-2.5 w-20" />
              <Skeleton className="h-6 w-6 rounded-sm" />
            </CardHeader>
            <CardContent className="px-2 pb-3.5">
              <Skeleton className="h-6 w-10 mb-1" />
              <div className="flex items-center gap-1 mt-0.5">
                <Skeleton className="h-2.5 w-12" />
                <Skeleton className="h-2.5 w-16" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
        <Card className="border-none bg-neutral-100 lg:col-span-1 h-full flex flex-col">
          <CardHeader className="p-4 pb-2">
            <Skeleton className="h-4 w-28 mb-1" />
            <Skeleton className="h-3 w-20" />
          </CardHeader>
          <CardContent className="p-4 pt-1 pb-4 flex-1">
            <div className="space-y-3">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="flex items-start gap-3 py-1.5 border-b border-black/5 last:border-0">
                  <Skeleton className="h-8 w-8 rounded-full shrink-0" />
                  <div className="flex-1 space-y-1.5">
                    <Skeleton className="h-3 w-28" />
                    <div className="flex items-center gap-2">
                      <Skeleton className="h-2.5 w-16" />
                      <Skeleton className="h-4 w-14 rounded-full" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-none bg-neutral-100 lg:col-span-2 h-full flex flex-col">
          <CardHeader className="p-4 pb-2 flex flex-row items-start justify-between space-y-0">
            <div className="space-y-1">
              <Skeleton className="h-4 w-36" />
              <Skeleton className="h-3 w-48" />
            </div>
            <Skeleton className="h-8 w-[180px] rounded-sm" />
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <Skeleton className="h-[260px] w-full rounded-sm" />
          </CardContent>
        </Card>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
        <Card className="border-none bg-neutral-100 lg:col-span-2 h-full flex flex-col">
          <CardHeader className="p-4 pb-2">
            <Skeleton className="h-4 w-36 mb-1" />
            <Skeleton className="h-3 w-24" />
          </CardHeader>
          <CardContent className="p-4 pt-1 pb-4">
            <div className="space-y-3">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="flex items-start gap-3 py-2 border-b border-black/5 last:border-0">
                  <Skeleton className="h-7 w-7 rounded-full shrink-0" />
                  <div className="flex-1 space-y-1.5">
                    <Skeleton className="h-3 w-36" />
                    <Skeleton className="h-2.5 w-full" />
                    <Skeleton className="h-2 w-16" />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-none bg-neutral-900 lg:col-span-1 h-full flex flex-col">
          <CardHeader className="p-4 pb-2">
            <Skeleton className="h-4 w-28 bg-white/10 mb-1" />
            <Skeleton className="h-3 w-20 bg-white/10" />
          </CardHeader>
          <CardContent className="p-4 pt-1 pb-4">
            <div className="space-y-3">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="flex items-center justify-between py-2 border-b border-white/10 last:border-0">
                  <div className="flex items-center gap-3">
                    <Skeleton className="h-8 w-8 rounded-full bg-white/10" />
                    <div className="space-y-1.5">
                      <Skeleton className="h-3 w-24 bg-white/10" />
                      <Skeleton className="h-2.5 w-32 bg-white/10" />
                    </div>
                  </div>
                  <div className="text-right space-y-1">
                    <Skeleton className="h-3 w-16 bg-white/10 ml-auto" />
                    <Skeleton className="h-4 w-12 bg-white/10 ml-auto rounded-full" />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

// ========================
// MY CHARGES PAGE SKELETON
// ========================
export function MyChargesPageSkeleton() {
  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-2 gap-3">
        {Array.from({ length: 2 }).map((_, i) => (
          <Card key={i} className="border-none bg-neutral-100">
            <CardContent className="p-4 space-y-1.5">
              <Skeleton className="h-2.5 w-20" />
              <Skeleton className="h-7 w-24" />
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="border-none bg-neutral-100">
        <CardHeader className="p-4 pb-2">
          <Skeleton className="h-4 w-28" />
        </CardHeader>
        <CardContent className="p-4 pt-1">
          <div className="space-y-2">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="flex items-center justify-between py-3 border-b border-black/5 last:border-0">
                <div className="flex items-center gap-3">
                  <Skeleton className="h-8 w-8 rounded-sm" />
                  <div className="space-y-1">
                    <Skeleton className="h-3.5 w-28" />
                    <Skeleton className="h-2.5 w-14" />
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-right space-y-1">
                    <Skeleton className="h-3.5 w-16 ml-auto" />
                    <Skeleton className="h-4 w-12 ml-auto rounded-full" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// ========================
// MY TICKETS PAGE SKELETON
// ========================
export function MyTicketsPageSkeleton() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-end">
        <Skeleton className="h-9 w-[120px] rounded-sm" />
      </div>

      <div className="space-y-2">
        {Array.from({ length: 3 }).map((_, i) => (
          <Card key={i} className="border-none bg-neutral-100">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <Skeleton className="h-8 w-8 rounded-sm shrink-0" />
                <div className="flex-1 min-w-0 space-y-2">
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-3.5 w-36" />
                    <Skeleton className="h-4 w-16 rounded-full" />
                  </div>
                  <Skeleton className="h-3 w-full" />
                  <Skeleton className="h-3 w-2/3" />
                  <Skeleton className="h-2.5 w-44" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

// ========================
// PROFILE PAGE SKELETON
// ========================
export function ProfilePageSkeleton() {
  return (
    <div className="flex flex-col gap-4 max-w-2xl">
      <Card className="border-none bg-neutral-100">
        <CardHeader className="p-4 pb-2">
          <div className="flex items-center justify-between">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-8 w-24 rounded-sm" />
          </div>
        </CardHeader>
        <CardContent className="p-4 pt-2 space-y-3">
          <div className="flex items-center gap-4 pb-3 border-b border-black/5">
            <Skeleton className="h-16 w-16 rounded-full" />
            <div className="space-y-1.5">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-3 w-16" />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="space-y-1">
                <Skeleton className="h-2.5 w-14" />
                <Skeleton className="h-3.5 w-32" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="border-none bg-neutral-100">
        <CardHeader className="p-4 pb-2">
          <Skeleton className="h-4 w-36 mb-1" />
          <Skeleton className="h-3 w-52" />
        </CardHeader>
        <CardContent className="p-4 pt-2 space-y-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="space-y-1.5">
              <Skeleton className="h-3 w-28" />
              <Skeleton className="h-9 w-full rounded-sm" />
            </div>
          ))}
          <Skeleton className="h-9 w-full rounded-sm mt-2" />
        </CardContent>
      </Card>
    </div>
  )
}
