import Link from "next/link";

export default function HomeownerViolations() {

const violations = [
{
id: "V-2204",
title: "Landscape Maintenance Notice",
status: "Pending Response",
deadline: "May 5, 2026",
fine: "$0",
update: "Courtesy notice issued. Response requested.",
},

{
id: "V-2198",
title: "Parking Violation Warning",
status: "Committee Review",
deadline: "May 2, 2026",
fine: "$50",
update: "Response received and under review.",
},

{
id: "V-2187",
title: "Architectural Modification Review Needed",
status: "Open",
deadline: "May 10, 2026",
fine: "$0",
update: "Additional information requested.",
}

];

return (
<main className="min-h-screen bg-slate-950 text-white">

<section className="relative overflow-hidden border-b border-white/10">
<div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(234,179,8,0.18),transparent_35%),radial-gradient(circle_at_top_left,rgba(15,23,42,1),transparent_40%)]"/>

<div className="relative mx-auto max-w-7xl px-6 py-8">

<div className="flex flex-wrap items-center justify-between gap-4">

<div>
<p className="text-sm uppercase tracking-[0.35em] text-yellow-400">
Homeowner Portal
</p>

<h1 className="mt-3 text-3xl md:text-5xl font-semibold tracking-tight">
Violations & Compliance
</h1>

<p className="mt-4 max-w-3xl text-slate-300">
Review notices, respond to compliance matters,
and track status updates.
</p>
</div>

<Link
href="/homeowner"
className="rounded-full border border-white/15 px-5 py-3 text-sm font-medium text-slate-200 hover:border-yellow-400/60 hover:text-yellow-300"
>
Back to Dashboard
</Link>

</div>
</div>
</section>


<section className="mx-auto max-w-7xl px-6 py-8">

<div className="grid gap-6 md:grid-cols-4">

{[
["Open Matters","3"],
["Pending Response","1"],
["Resolved","4"],
["Hearings","0"],
].map(([label,value]) => (

<div
key={label}
className="rounded-3xl border border-white/10 bg-white/[0.04] p-6"
>
<p className="text-sm text-slate-400">
{label}
</p>

<div className="mt-3 text-4xl font-bold text-yellow-400">
{value}
</div>

</div>

))}

</div>

</section>


<section className="mx-auto grid max-w-7xl gap-6 px-6 pb-10 lg:grid-cols-[1.05fr_0.95fr]">


<div>

<div className="mb-5">
<p className="text-sm font-medium text-yellow-400">
Violation Notices
</p>

<h2 className="mt-2 text-2xl font-semibold">
Open Compliance Items
</h2>
</div>

<div className="space-y-5">

{violations.map((item)=>(

<div
key={item.id}
className="rounded-3xl border border-white/10 bg-white/[0.04] p-6"
>

<div className="flex items-start justify-between gap-4">

<div>
<p className="text-sm text-slate-400">
{item.id}
</p>

<h3 className="mt-2 text-xl font-semibold">
{item.title}
</h3>
</div>

<span className="rounded-full bg-slate-800 px-3 py-1 text-xs text-slate-300">
{item.status}
</span>

</div>

<div className="mt-5 space-y-3 text-sm">

<div className="flex justify-between">
<span className="text-slate-400">
Deadline
</span>

<span>
{item.deadline}
</span>
</div>

<div className="flex justify-between">
<span className="text-slate-400">
Fine
</span>

<span>
{item.fine}
</span>
</div>

</div>

<div className="mt-5 rounded-2xl bg-slate-900 p-4 text-sm text-slate-300">
{item.update}
</div>

<button className="mt-5 w-full rounded-2xl border border-white/10 px-4 py-3 text-sm font-semibold text-slate-200 hover:border-yellow-400/50 hover:text-yellow-300">
View Notice
</button>

</div>

))}

</div>

</div>



<div className="space-y-6">


<div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">

<p className="text-sm font-medium text-yellow-400">
Submit Response
</p>

<h2 className="mt-2 text-2xl font-semibold">
Respond or Confirm Correction
</h2>

<div className="mt-6 space-y-5">

<textarea
rows="5"
placeholder="Enter response or correction details"
className="w-full rounded-2xl border border-white/10 bg-slate-900 px-4 py-3 text-white placeholder:text-slate-500"
/>

<button className="w-full rounded-2xl bg-yellow-400 px-5 py-4 font-semibold text-slate-950">
Submit Response
</button>

</div>

</div>



<div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">

<p className="text-sm font-medium text-yellow-400">
Compliance Timeline
</p>

<div className="mt-5 space-y-4">

{[
"Courtesy Notice",
"Owner Response Opportunity",
"Management Review",
"BOD / Committee Review",
"Resolution Decision",
"Owner Notification",
].map((step,index)=>(

<div key={step} className="flex gap-4">

<div className="flex h-8 w-8 items-center justify-center rounded-full bg-yellow-400 text-slate-950 font-bold text-sm">
{index+1}
</div>

<div>
<p className="font-medium">
{step}
</p>

<p className="text-sm text-slate-400">
Step {index+1} of compliance process
</p>
</div>

</div>

))}

</div>

</div>



<div className="rounded-3xl border border-yellow-400/20 bg-yellow-400/10 p-6">

<p className="text-sm font-medium text-yellow-300">
Ask Ava About This Notice
</p>

<h2 className="mt-2 text-2xl font-semibold">
Need help understanding a violation?
</h2>

<p className="mt-3 text-sm text-slate-300 leading-6">
Ava can explain what governing documents may apply,
what options may exist, and what actions may be available.
</p>

<button className="mt-5 rounded-2xl border border-yellow-400/40 px-5 py-3 text-sm font-semibold text-yellow-300 hover:bg-yellow-400 hover:text-slate-950">
Ask Ava
</button>

</div>



<div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">

<p className="text-sm font-medium text-yellow-400">
Documents Quick Links
</p>

<div className="mt-5 space-y-3">

{[
"Rules & Regulations",
"Declaration",
"Fine Policy",
"Architectural Standards",
].map((doc)=>(

<button
  key={doc}
  className="block w-full w-full rounded-2xl border border-white/10 px-4 py-3 text-left text-sm hover:border-yellow-400/40"
>
  {doc}
</button>
))}

</div>

</div>


</div>

</section>

</main>

);
}
