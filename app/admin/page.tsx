"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  LayoutDashboard, CalendarDays, Users, Trophy, Settings,
  TrendingUp, TrendingDown, DollarSign, Star, Send, Download,
  Lock, Tag, Menu, X, CheckCircle2, Clock
} from "lucide-react";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Area, AreaChart
} from "recharts";
import { adminStats } from "@/lib/data";

type NavItem = "dashboard" | "bookings" | "customers" | "tournaments" | "settings";

const NAV_ITEMS: { id: NavItem; icon: React.ElementType; label: string }[] = [
  { id: "dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { id: "bookings", icon: CalendarDays, label: "Bookings" },
  { id: "customers", icon: Users, label: "Customers" },
  { id: "tournaments", icon: Trophy, label: "Tournaments" },
  { id: "settings", icon: Settings, label: "Settings" },
];

function StatCard({ title, value, trend, trendLabel, icon: Icon, color }: {
  title: string; value: string; trend: number; trendLabel: string;
  icon: React.ElementType; color: string;
}) {
  const up = trend >= 0;
  return (
    <div className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-2xl p-5">
      <div className="flex items-start justify-between mb-4">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${color}`}>
          <Icon size={18} />
        </div>
        <div className={`flex items-center gap-1 text-xs font-bold ${up ? "text-[#00FF87]" : "text-red-400"}`}>
          {up ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
          {up ? "+" : ""}{trend}%
        </div>
      </div>
      <div className="text-2xl font-black text-white mb-1" style={{ fontFamily: "Impact, sans-serif" }}>{value}</div>
      <div className="text-gray-500 text-xs">{title}</div>
      <div className="text-gray-600 text-[10px] mt-0.5">{trendLabel}</div>
    </div>
  );
}

function PeakHoursHeatmap() {
  const matrix = adminStats.peakHoursMatrix as Record<string, Record<number, number>>;
  const days = Object.keys(matrix);
  const hours = Array.from({ length: 24 }, (_, i) => i);

  const getColor = (v: number) => {
    if (v < 20) return "bg-[#1A1A1A]";
    if (v < 40) return "bg-[#00FF87]/10";
    if (v < 60) return "bg-[#00FF87]/25";
    if (v < 80) return "bg-[#00FF87]/45";
    return "bg-[#00FF87]/70";
  };

  return (
    <div className="overflow-x-auto">
      <div className="min-w-[700px]">
        {/* Hour labels */}
        <div className="flex ml-10 mb-1">
          {hours.filter((_, i) => i % 3 === 0).map((h) => (
            <div key={h} className="flex-1 text-center text-[9px] text-gray-600">
              {h === 0 ? "12a" : h < 12 ? `${h}a` : h === 12 ? "12p" : `${h - 12}p`}
            </div>
          ))}
        </div>
        {days.map((day) => (
          <div key={day} className="flex items-center gap-1 mb-1">
            <div className="w-9 text-[10px] text-gray-500 text-right pr-1.5">{day}</div>
            <div className="flex flex-1 gap-[2px]">
              {hours.map((h) => (
                <div
                  key={h}
                  title={`${day} ${h}:00 — ${matrix[day][h]}% booked`}
                  className={`flex-1 h-5 rounded-[2px] ${getColor(matrix[day][h])} transition-all hover:opacity-80 cursor-default`}
                />
              ))}
            </div>
          </div>
        ))}
        <div className="flex items-center gap-2 mt-3 ml-10">
          <span className="text-[10px] text-gray-600">Low</span>
          {["bg-[#1A1A1A]", "bg-[#00FF87]/10", "bg-[#00FF87]/25", "bg-[#00FF87]/45", "bg-[#00FF87]/70"].map((c, i) => (
            <div key={i} className={`w-5 h-3 rounded-[2px] ${c} border border-white/5`} />
          ))}
          <span className="text-[10px] text-gray-600">High</span>
        </div>
      </div>
    </div>
  );
}

const statusConfig: Record<string, { label: string; cls: string }> = {
  paid: { label: "Paid", cls: "text-[#00FF87] bg-[#00FF87]/10" },
  pending: { label: "Pending", cls: "text-yellow-400 bg-yellow-400/10" },
};
const checkInConfig: Record<string, { label: string; cls: string }> = {
  checked_in: { label: "✓ Checked In", cls: "text-[#00FF87]" },
  not_arrived: { label: "Awaiting", cls: "text-gray-500" },
};

export default function AdminPage() {
  const [nav, setNav] = useState<NavItem>("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [broadcastText, setBroadcastText] = useState("");
  const [broadcastSent, setBroadcastSent] = useState(false);

  const sendBroadcast = () => {
    if (!broadcastText.trim()) return;
    setBroadcastSent(true);
    setTimeout(() => { setBroadcastSent(false); setBroadcastText(""); }, 3000);
  };

  const revenueData = adminStats.revenueData;

  return (
    <div className="flex h-screen bg-[#0A0A0A] overflow-hidden">
      {/* Sidebar */}
      <aside className={`fixed md:static top-0 left-0 h-full z-50 w-60 bg-[#111111] border-r border-[#2A2A2A] flex flex-col transition-transform duration-300 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}>
        {/* Logo */}
        <div className="p-5 border-b border-[#2A2A2A] flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-[#00FF87] flex items-center justify-center">
            <span className="text-black font-black text-sm">C</span>
          </div>
          <div>
            <div className="text-[#00FF87] font-black text-lg tracking-widest uppercase" style={{ fontFamily: "Impact, sans-serif" }}>CAIRO</div>
            <div className="text-gray-600 text-[9px] tracking-wider uppercase -mt-0.5">Admin Panel</div>
          </div>
          <button className="ml-auto md:hidden text-gray-500" onClick={() => setSidebarOpen(false)}><X size={16} /></button>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-3 space-y-1">
          {NAV_ITEMS.map(({ id, icon: Icon, label }) => (
            <button
              key={id}
              onClick={() => { setNav(id); setSidebarOpen(false); }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                nav === id ? "bg-[#00FF87]/10 text-[#00FF87]" : "text-gray-400 hover:bg-[#1A1A1A] hover:text-white"
              }`}
            >
              <Icon size={16} />
              {label}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-[#2A2A2A]">
          <div className="bg-[#1A1A1A] rounded-xl p-3 text-xs text-gray-500">
            <p className="text-white font-semibold text-xs mb-0.5">Cairo Box Cricket</p>
            <p>Admin Portal · v1.0</p>
          </div>
        </div>
      </aside>

      {/* Sidebar overlay (mobile) */}
      {sidebarOpen && <div className="fixed inset-0 bg-black/60 z-40 md:hidden" onClick={() => setSidebarOpen(false)} />}

      {/* Main */}
      <main className="flex-1 overflow-y-auto">
        {/* Top bar */}
        <div className="sticky top-0 z-30 bg-[#0A0A0A]/90 backdrop-blur-md border-b border-[#2A2A2A] px-4 md:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button className="md:hidden p-2 text-gray-400 hover:text-white" onClick={() => setSidebarOpen(true)}>
              <Menu size={20} />
            </button>
            <div>
              <h1 className="text-white font-bold capitalize">{nav}</h1>
              <p className="text-gray-600 text-xs">Cairo Box Cricket · Uppal, Hyderabad</p>
            </div>
          </div>
          <div className="flex items-center gap-2 bg-[#1A1A1A] border border-[#2A2A2A] rounded-xl px-3 py-1.5 text-xs text-gray-400">
            <span className="live-dot" />
            <span>Live</span>
          </div>
        </div>

        <div className="p-4 md:p-6 space-y-6 pb-10">
          {/* ---- DASHBOARD ---- */}
          {nav === "dashboard" && (
            <>
              {/* Stat Cards */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard title="Today's Revenue" value={`₹${adminStats.todayRevenue.toLocaleString("en-IN")}`} trend={adminStats.todayRevenueTrend} trendLabel="vs yesterday" icon={DollarSign} color="bg-[#00FF87]/10 text-[#00FF87]" />
                <StatCard title="This Week" value={`₹${adminStats.weekRevenue.toLocaleString("en-IN")}`} trend={adminStats.weekRevenueTrend} trendLabel="vs last week" icon={TrendingUp} color="bg-blue-400/10 text-blue-400" />
                <StatCard title="Total Customers" value={adminStats.totalCustomers.toLocaleString("en-IN")} trend={adminStats.customersTrend} trendLabel="new this month" icon={Users} color="bg-purple-400/10 text-purple-400" />
                <StatCard title="Slots Booked Today" value={`${adminStats.slotsBookedToday}/${adminStats.totalSlotsToday}`} trend={adminStats.slotsTrend} trendLabel="vs yesterday" icon={CalendarDays} color="bg-yellow-400/10 text-yellow-400" />
              </div>

              {/* Revenue Chart */}
              <div className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-2xl p-5">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-white font-bold">Revenue — Last 30 Days</h3>
                    <p className="text-gray-500 text-xs mt-0.5">Daily slot bookings revenue</p>
                  </div>
                  <div className="text-[#00FF87] font-black text-lg" style={{ fontFamily: "Impact, sans-serif" }}>
                    ₹{revenueData.reduce((s, d) => s + d.revenue, 0).toLocaleString("en-IN")}
                  </div>
                </div>
                <ResponsiveContainer width="100%" height={220}>
                  <AreaChart data={revenueData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="greenGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#00FF87" stopOpacity={0.25} />
                        <stop offset="95%" stopColor="#00FF87" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#2A2A2A" />
                    <XAxis dataKey="date" tick={{ fill: "#555", fontSize: 10 }} tickLine={false} axisLine={false} interval={4} />
                    <YAxis tick={{ fill: "#555", fontSize: 10 }} tickLine={false} axisLine={false} tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}k`} />
                    <Tooltip
                      contentStyle={{ background: "#1A1A1A", border: "1px solid #2A2A2A", borderRadius: 12, fontSize: 12 }}
                      labelStyle={{ color: "#888" }}
                      itemStyle={{ color: "#00FF87" }}
                      formatter={(v: unknown) => [`₹${Number(v).toLocaleString("en-IN")}`, "Revenue"]}
                    />
                    <Area type="monotone" dataKey="revenue" stroke="#00FF87" strokeWidth={2} fill="url(#greenGrad)" dot={false} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              {/* Two columns: heatmap + WhatsApp */}
              <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
                {/* Peak hours heatmap */}
                <div className="lg:col-span-3 bg-[#1A1A1A] border border-[#2A2A2A] rounded-2xl p-5">
                  <h3 className="text-white font-bold mb-1">Peak Hours Heatmap</h3>
                  <p className="text-gray-500 text-xs mb-4">Booking intensity by day & hour</p>
                  <PeakHoursHeatmap />
                </div>

                {/* WhatsApp broadcast */}
                <div className="lg:col-span-2 bg-[#1A1A1A] border border-[#2A2A2A] rounded-2xl p-5 flex flex-col">
                  <div className="flex items-center gap-2 mb-1">
                    <svg viewBox="0 0 24 24" className="w-4 h-4 fill-[#25D366]">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                    <h3 className="text-white font-bold">WhatsApp Broadcast</h3>
                  </div>
                  <p className="text-gray-500 text-xs mb-4">Send message to all {adminStats.totalCustomers.toLocaleString()} customers</p>
                  <textarea
                    value={broadcastText}
                    onChange={(e) => setBroadcastText(e.target.value)}
                    placeholder="e.g. Notify all customers about Diwali tournament registrations..."
                    className="flex-1 min-h-[100px] bg-[#111] border border-[#2A2A2A] focus:border-[#25D366]/50 rounded-xl px-3 py-2.5 text-sm text-white placeholder:text-gray-600 outline-none resize-none transition-colors mb-3"
                  />
                  <button
                    onClick={sendBroadcast}
                    className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm transition-all ${
                      broadcastSent
                        ? "bg-[#00FF87]/20 text-[#00FF87] border border-[#00FF87]/30"
                        : "bg-[#25D366] hover:bg-[#20bd5a] text-white"
                    }`}
                  >
                    {broadcastSent ? <><CheckCircle2 size={15} /> Sent to 1,247 customers!</> : <><Send size={15} /> Send Broadcast</>}
                  </button>

                  {/* Quick Actions */}
                  <div className="mt-4 pt-4 border-t border-[#2A2A2A] space-y-2">
                    <p className="text-gray-500 text-xs font-semibold uppercase tracking-wider mb-2">Quick Actions</p>
                    {[
                      { icon: Lock, label: "Block a Slot (Maintenance)" },
                      { icon: Tag, label: "Add Promo Code" },
                      { icon: Download, label: "Export Bookings CSV" },
                    ].map(({ icon: Ic, label }) => (
                      <button key={label} className="w-full flex items-center gap-2 text-xs text-gray-400 hover:text-white bg-[#111] hover:bg-[#1A1A1A] border border-[#2A2A2A] rounded-xl px-3 py-2.5 transition-all text-left">
                        <Ic size={13} />
                        {label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Today's bookings + Reviews */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                {/* Bookings table */}
                <div className="lg:col-span-2 bg-[#1A1A1A] border border-[#2A2A2A] rounded-2xl overflow-hidden">
                  <div className="flex items-center justify-between px-5 py-4 border-b border-[#2A2A2A]">
                    <h3 className="text-white font-bold">Today's Bookings</h3>
                    <span className="text-xs text-gray-500">{adminStats.todayBookings.length} bookings</span>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-xs">
                      <thead>
                        <tr className="border-b border-[#2A2A2A]">
                          {["Customer", "Slot", "Amount", "Status", "Check-in"].map((h) => (
                            <th key={h} className="text-left text-gray-500 font-semibold px-4 py-2.5 uppercase tracking-wider text-[10px]">{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {adminStats.todayBookings.map((b) => {
                          const sc = statusConfig[b.status] ?? { label: b.status, cls: "text-gray-400 bg-gray-400/10" };
                          const cc = checkInConfig[b.checkIn] ?? { label: b.checkIn, cls: "text-gray-500" };
                          return (
                            <tr key={b.id} className="border-b border-[#2A2A2A]/50 hover:bg-[#111] transition-colors">
                              <td className="px-4 py-3">
                                <div className="text-white font-semibold">{b.customer}</div>
                                <div className="text-gray-600">{b.phone}</div>
                              </td>
                              <td className="px-4 py-3">
                                <div className="flex items-center gap-1 text-gray-300">
                                  <Clock size={10} className="text-gray-500" />
                                  {b.slot}
                                </div>
                                {b.addOns.length > 0 && <div className="text-gray-600 mt-0.5">{b.addOns.join(", ")}</div>}
                              </td>
                              <td className="px-4 py-3 text-white font-bold">₹{b.amount.toLocaleString("en-IN")}</td>
                              <td className="px-4 py-3">
                                <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${sc.cls}`}>{sc.label}</span>
                              </td>
                              <td className={`px-4 py-3 font-semibold ${cc.cls}`}>{cc.label}</td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Reviews */}
                <div className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-2xl overflow-hidden">
                  <div className="px-5 py-4 border-b border-[#2A2A2A]">
                    <h3 className="text-white font-bold">Recent Reviews</h3>
                  </div>
                  <div className="p-4 space-y-4">
                    {adminStats.recentReviews.map((r, i) => (
                      <div key={i} className="border-b border-[#2A2A2A] pb-4 last:border-0 last:pb-0">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-white font-semibold text-sm">{r.name}</span>
                          <span className="text-gray-600 text-[10px]">{r.date}</span>
                        </div>
                        <div className="flex gap-0.5 mb-1.5">
                          {Array.from({ length: r.rating }).map((_, j) => (
                            <Star key={j} size={11} className="fill-yellow-400 text-yellow-400" />
                          ))}
                        </div>
                        <p className="text-gray-400 text-xs leading-relaxed">{r.text}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}

          {/* ---- OTHER SECTIONS (placeholder) ---- */}
          {nav !== "dashboard" && (
            <div className="flex flex-col items-center justify-center py-32 text-center">
              <div className="w-16 h-16 rounded-2xl bg-[#1A1A1A] border border-[#2A2A2A] flex items-center justify-center mb-4">
                {(() => { const { icon: Icon } = NAV_ITEMS.find(n => n.id === nav)!; return <Icon size={24} className="text-[#00FF87]" />; })()}
              </div>
              <h3 className="text-white font-bold text-xl capitalize mb-2">{nav}</h3>
              <p className="text-gray-500 text-sm">This section is coming in the full build.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
