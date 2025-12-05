import { Parking } from "@/app/types/parking";

interface ParkingCardProps {
  parking: Parking;
}

interface CapacityItemProps {
  label: string;
  value: number;
  icon: React.ReactNode;
}

function CapacityItem({ label, value, icon }: CapacityItemProps) {
  if (value === 0) return null;

  return (
    <div className="flex items-center gap-2 text-sm">
      <span className="text-blue-600">{icon}</span>
      <span className="text-slate-600">{label}:</span>
      <span className="font-semibold text-slate-800">{value}</span>
    </div>
  );
}

export default function ParkingCard({ parking }: ParkingCardProps) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm hover:shadow-lg hover:border-blue-200 transition-all duration-300 group">
      <div className="mb-4">
        <h3 className="text-lg font-bold text-slate-800 mb-1 group-hover:text-blue-600 transition-colors">
          {parking.nom || "Parking sans nom"}
        </h3>
        <div className="flex items-center gap-1.5 text-xs text-slate-500">
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span>{parking.ylat.toFixed(5)}, {parking.xlong.toFixed(5)}</span>
        </div>
      </div>

      <div className="mb-4 p-4 bg-blue-50 rounded-xl border border-blue-100">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-blue-700">Total places</span>
          <span className="text-3xl font-bold text-blue-600">
            {parking.nbPlaces}
          </span>
        </div>
      </div>

      <div className="space-y-2.5">
        <CapacityItem
          label="Park & Ride"
          value={parking.nbPr}
          icon={
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
            </svg>
          }
        />
        <CapacityItem
          label="PMR"
          value={parking.nbPmr}
          icon={
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          }
        />
        <CapacityItem
          label="Electriques"
          value={parking.nbVoituresElectriques}
          icon={
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          }
        />
        <CapacityItem
          label="Velos"
          value={parking.nbVelo}
          icon={
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <circle cx="5.5" cy="17.5" r="3.5" strokeWidth={2} />
              <circle cx="18.5" cy="17.5" r="3.5" strokeWidth={2} />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 17.5l-3-6h6l3 6M9 11.5l3-6" />
            </svg>
          }
        />
        <CapacityItem
          label="2 roues elec."
          value={parking.nb2rEl}
          icon={
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          }
        />
        <CapacityItem
          label="Autopartage"
          value={parking.nbAutopartage}
          icon={
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          }
        />
        <CapacityItem
          label="2 roues motor."
          value={parking.nb2Rm}
          icon={
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <circle cx="6" cy="17" r="3" strokeWidth={2} />
              <circle cx="18" cy="17" r="3" strokeWidth={2} />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 17h12M9 14l3-7h3l2 7" />
            </svg>
          }
        />
      </div>
    </div>
  );
}