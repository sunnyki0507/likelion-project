// "use client"
// import type { ViewType } from "@/types/view"
// import { Squares2X2Icon, ListBulletIcon } from "@heroicons/react/24/outline"

// interface ViewToggleProps {
//   currentView: ViewType
//   onViewChange: (view: ViewType) => void
// }

// export default function ViewToggle({ currentView, onViewChange }: ViewToggleProps) {
//   return (
//     <div className="flex items-center space-x-2 bg-gray-100 p-1 rounded-lg">
//       <button
//         onClick={() => onViewChange("Card")}
//         className={`p-2 rounded-md ${
//           currentView === "Card" ? "bg-white shadow-sm" : "hover:bg-gray-200"
//         } transition-colors`}
//         aria-label="Card View"
//       >
//         <Squares2X2Icon className="w-5 h-5" />
//       </button>
//       <button
//         onClick={() => onViewChange("List")}
//         className={`p-2 rounded-md ${
//           currentView === "List" ? "bg-white shadow-sm" : "hover:bg-gray-200"
//         } transition-colors`}
//         aria-label="List View"
//       >
//         <ListBulletIcon className="w-5 h-5" />
//       </button>
//     </div>
//   )
// }
"use client"
import type { ViewType } from "@/types/view"
import { Squares2X2Icon, ListBulletIcon } from "@heroicons/react/24/outline"

interface ViewToggleProps {
  currentView: ViewType
  onViewChange: (view: ViewType) => void
}

export default function ViewToggle({ currentView, onViewChange }: ViewToggleProps) {
  return (
    <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
      <button
        onClick={() => onViewChange("Card")}
        className={`p-2 ${currentView === "Card" ? "bg-gray-100" : "bg-white hover:bg-gray-50"} transition-colors`}
        aria-label="Card View"
      >
        <Squares2X2Icon className="w-5 h-5" />
      </button>
      <button
        onClick={() => onViewChange("List")}
        className={`p-2 ${currentView === "List" ? "bg-gray-100" : "bg-white hover:bg-gray-50"} transition-colors`}
        aria-label="List View"
      >
        <ListBulletIcon className="w-5 h-5" />
      </button>
    </div>
  )
}
