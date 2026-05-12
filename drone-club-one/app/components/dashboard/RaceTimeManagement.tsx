"use client";

import { getPilot, getPilots } from "@/app/data/queries/pilots";
import { getRaceNamesAndIDs } from "@/app/data/queries/races";
import { Edit, Plus, Save, Trophy, X } from "lucide-react";
import { useState } from "react";

export default function RaceTimeManagement() {
    // const races = await getRaceNamesAndIDs();
    // const pilots = await getPilots();
    
    // const [selectedRace, setSelectedRace] = useState<number | null>(null);
    // const [showAddEntry, setShowAddEntry] = useState(false);
    // const [newEntry, setNewEntry] = useState({ pilotId: "", time: "", crashes: "0" });
    // const [leaderboard, setLeaderboard] = useState([]);
    // const [editingIndex, setEditingIndex] = useState<number | null>(null);
    // const [editEntry, setEditEntry] = useState({ time: "", crashes: "" });


    // const handleAddEntry = () => {

    // }

    // return (
    //     <div>
    //         <h2 className="text-2xl mb-6">Race Time Management</h2>

    //         <div className="bg-card border border-border rounded-lg p-6 mb-6">
    //             <label className="block mb-2">Select Race</label>
    //             <select
    //             value={ selectedRace || "" }
    //                 onChange={(e) => setSelectedRace(e.target.value ? Number(e.target.value) : null)}
    //                 className="w-full max-w-md px-4 py-2 bg-input-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
    //             >
    //                 <option value="">Choose a race...</option>
    //                 {races.map(race => (
    //                         <option key={race.id} value={race.id}>{race.title}</option>
    //                     ))}
    //             </select>
    //         </div>

    //         {selectedRace && (
    //                 <div className="bg-card border border-border rounded-lg overflow-hidden">
    //                     <div className="flex items-center justify-between p-4 bg-secondary border-b border-border">
    //                         <h3 className="text-xl">Leaderboard</h3>
    //                         {!showAddEntry && (
    //                             <button
    //                                 onClick={() => setShowAddEntry(true)}
    //                                 className="flex items-center gap-2 px-4 py-2 bg-accent text-accent-foreground rounded-md hover:opacity-90 transition-opacity"
    //                             >
    //                                 <Plus className="w-4 h-4" />
    //                                 Add Entry
    //                             </button>
    //                         )}
    //                     </div>

    //                     {showAddEntry && (
    //                         <div className="p-4 bg-secondary/50 border-b border-border overflow-x-auto">
    //                             <div className="grid grid-cols-4 gap-4 min-w-[600px]">
    //                                 <div>
    //                                     <label className="block mb-2 text-sm">Pilot</label>
    //                                     <select
    //                                         value={newEntry.pilotId}
    //                                         onChange={(e) => setNewEntry({ ...newEntry, pilotId: e.target.value })}
    //                                         className="w-full px-3 py-2 bg-input-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
    //                                     >
    //                                         <option value="">Select pilot...</option>
    //                                         {pilots.map(pilot => (
    //                                             <option key={pilot.id} value={pilot.id}>{`${pilot.firstname} ${pilot.middlename ? pilot.middlename + ' ' : ''}${pilot.lastname} (${pilot.nickname})`}</option>
    //                                         ))}
    //                                     </select>
    //                                 </div>
    //                                 <div>
    //                                     <label className="block mb-2 text-sm">Time</label>
    //                                     <input
    //                                         type="text"
    //                                         value={newEntry.time}
    //                                         onChange={(e) => setNewEntry({ ...newEntry, time: e.target.value })}
    //                                         className="w-full px-3 py-2 bg-input-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-accent font-mono"
    //                                         placeholder="1:23.456"
    //                                     />
    //                                 </div>
    //                                 <div>
    //                                     <label className="block mb-2 text-sm">Crashes</label>
    //                                     <input
    //                                         type="number"
    //                                         min="0"
    //                                         value={newEntry.crashes}
    //                                         onChange={(e) => setNewEntry({ ...newEntry, crashes: e.target.value })}
    //                                         className="w-full px-3 py-2 bg-input-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
    //                                     />
    //                                 </div>
    //                                 <div className="flex items-end gap-2">
    //                                     <button
    //                                         onClick={handleAddEntry}
    //                                         className="flex-1 px-4 py-2 bg-accent text-accent-foreground rounded-md hover:opacity-90 transition-opacity"
    //                                     >
    //                                         <Save className="w-4 h-4 mx-auto" />
    //                                     </button>
    //                                     <button
    //                                         onClick={() => {
    //                                             setShowAddEntry(false);
    //                                             setNewEntry({ pilotId: "", time: "", crashes: "0" });
    //                                         }}
    //                                         className="flex-1 px-4 py-2 bg-secondary text-foreground rounded-md hover:bg-muted transition-colors"
    //                                     >
    //                                         <X className="w-4 h-4 mx-auto" />
    //                                     </button>
    //                                 </div>
    //                             </div>
    //                         </div>
    //                     )}

    //                     <div className="overflow-x-auto">
    //                         <div className="grid grid-cols-5 gap-4 p-4 bg-secondary border-b border-border min-w-[700px]">
    //                             <div className="text-muted-foreground tracking-wide">POS</div>
    //                             <div className="text-muted-foreground tracking-wide">PILOT</div>
    //                             <div className="text-muted-foreground tracking-wide">TIME</div>
    //                             <div className="text-muted-foreground tracking-wide">CRASHES</div>
    //                             <div className="text-muted-foreground tracking-wide">ACTIONS</div>
    //                         </div>

    //                         {/* {leaderboard.length === 0 ? (
    //                             <div className="p-8 text-center text-muted-foreground">
    //                                 No entries yet. Add the first entry above.
    //                             </div>
    //                         ) : (
    //                             leaderboard.map((entry, index) => (
    //                                 <div
    //                                     key={index}
    //                                     className="grid grid-cols-5 gap-4 p-4 border-b border-border last:border-b-0 min-w-[700px]"
    //                                 >
    //                                     {editingIndex === index ? (
    //                                         <>
    //                                             <div className="flex items-center gap-2">
    //                                                 <span>{index + 1}</span>
    //                                                 {index === 0 && <Trophy className="w-4 h-4 text-accent" />}
    //                                             </div>
    //                                             <div>{entry.pilotName}</div>
    //                                             <div>
    //                                                 <input
    //                                                     type="text"
    //                                                     value={editEntry.time}
    //                                                     onChange={(e) => setEditEntry({ ...editEntry, time: e.target.value })}
    //                                                     className="w-full px-2 py-1 bg-input-background border border-border rounded focus:outline-none focus:ring-2 focus:ring-accent font-mono"
    //                                                 />
    //                                             </div>
    //                                             <div>
    //                                                 <input
    //                                                     type="number"
    //                                                     min="0"
    //                                                     value={editEntry.crashes}
    //                                                     onChange={(e) => setEditEntry({ ...editEntry, crashes: e.target.value })}
    //                                                     className="w-full px-2 py-1 bg-input-background border border-border rounded focus:outline-none focus:ring-2 focus:ring-accent"
    //                                                 />
    //                                             </div>
    //                                             <div className="flex gap-2">
    //                                                 <button
    //                                                     onClick={handleSaveEdit}
    //                                                     className="px-3 py-1 bg-accent text-accent-foreground rounded hover:opacity-90 transition-opacity"
    //                                                 >
    //                                                     <Save className="w-4 h-4" />
    //                                                 </button>
    //                                                 <button
    //                                                     onClick={handleCancelEdit}
    //                                                     className="px-3 py-1 bg-secondary text-foreground rounded hover:bg-muted transition-colors"
    //                                                 >
    //                                                     <X className="w-4 h-4" />
    //                                                 </button>
    //                                             </div>
    //                                         </>
    //                                     ) : (
    //                                         <>
    //                                             <div className="flex items-center gap-2">
    //                                                 <span className={index === 0 ? "text-accent" : ""}>{index + 1}</span>
    //                                                 {index === 0 && <Trophy className="w-4 h-4 text-accent" />}
    //                                             </div>
    //                                             <div>{entry.pilotName}</div>
    //                                             <div className="font-mono">{entry.time}</div>
    //                                             <div>{entry.crashes}</div>
    //                                             <div>
    //                                                 <button
    //                                                     onClick={() => handleEditEntry(index)}
    //                                                     className="px-3 py-1 bg-secondary text-foreground rounded hover:bg-muted transition-colors flex items-center gap-2"
    //                                                 >
    //                                                     <Edit className="w-4 h-4" />
    //                                                     Edit
    //                                                 </button>
    //                                             </div>
    //                                         </>
    //                                     )}
    //                                 </div>
    //                             ))
    //                         )} */}
    //                     </div>
    //                 </div>
    //             )
    //     </div>
    // );
}