'use client';

import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { UsersIcon } from 'lucide-react';
import { RoundCard } from '@/components/RoundCard';
import { TimelineConnector } from '@/components/TimelineConnector';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import axios from "axios";
import { useRouter } from 'next/navigation';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Input } from '@/components/ui/input';
import CreateTeamDialog from '@/components/CreateTeamDialog';

export interface Round {
  id: number;
  title: string;
  description: string;
  icon: string;
  status: 'locked' | 'active' | 'completed';
  deadline: string;
}

const rounds: Round[] = [
  {
    id: 1,
    title: "Round 1: Ideation Phase",
    description: "Submit your innovative idea and initial proposal. Focus on problem identification and solution approach.",
    icon: "rocket",
    status: "completed",
    deadline: "March 15, 2024"
  },
  {
    id: 2,
    title: "Round 2: Development Phase",
    description: "Build your prototype and demonstrate core functionalities. Show us your technical expertise.",
    icon: "bulb",
    status: "active",
    deadline: "March 30, 2024"
  },
  {
    id: 3,
    title: "Round 3: Final Presentation",
    description: "Present your complete solution to our panel of industry experts and compete for the grand prize.",
    icon: "trophy",
    status: "locked",
    deadline: "April 15, 2024"
  }
];

export interface teamDetailsType {
  name: string;
  year: string;
  dept: string;
  isTeamLead: boolean;
}

function App() {
    const [inTeam, setInTeam] = useState(false);
    const [teamDetails, setTeamDetails] = useState<teamDetailsType[] | undefined>(undefined);
    const [name,setName]=useState<string>("");
    const [regNo,setRegNo]=useState<string>("");
    const [dept,setDept]=useState<string>("");
    const [year,setYear]=useState<string>("");
    const [gender,setGender]=useState<string>("");
    const [phno,setPhno]=useState<string>("");
    const [teamName,setTeamName]=useState<string>("");


  const { data } = useSession();
  const router = useRouter();

  const getTeam = async () => {
    if (!data) {
      alert("Login First");
      router.push("/");
      return;
    }

    try {
      const res = await axios.get("/api/users/isinateam", {
        //@ts-ignore
        headers: { email: data.user.email }
      });

      if (res.status === 200) {
        setInTeam(true);
        if(res.data.teamdetails){
          setTeamDetails(res.data.teamdetails.team.members);
        }
      }
    } catch (error) {
      console.error(error);
    
      alert("An error occurred while fetching team details.");
    }
  };

  useEffect(() => {
    if (data) {
      console.log("Running");
      getTeam();
    }
  }, [data]);

  const handleSubmitClick=async ()=>{
        try{
            const res=await axios.post('/api/users/createteam',{
                teamName,
                teamLead:{
                    name,
                    email:data?.user?.email,
                    gender,
                    regNo,
                    dept,
                    year,
                    phoneno:phno,
                }
            })
            console.log(res.data)
          
        }
        catch(e)
        {
            alert("error")
        } 
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-blue-900 to-purple-900 text-white w-screen">
      <div className="fixed inset-0 bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072')] bg-cover opacity-10" />
      <div className="relative">
        <motion.div
          className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <motion.div
            className="text-center mb-24"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
              Hackfusion 25
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto">
              Join our premier hackathon and transform your innovative ideas into reality
            </p>
          </motion.div>

          <motion.div
            className="text-center mb-12 flex justify-center gap-6 flex-wrap"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            {inTeam ? (
              <>
                {/* <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      size="lg"
                      className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 text-xl px-8 py-4 sm:px-12 sm:py-8 rounded-2xl shadow-lg shadow-purple-500/20"
                    >
                      <UsersIcon className="mr-3 h-6 w-6" />
                      Create Team
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Create Team</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-4">
                        <Label htmlFor="regno" className="text-right">
                          Team Name
                        </Label>
                        <Input id="regno" className="col-span-3" onChange={(e)=>setTeamName(e.target.value)}/>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                          Name
                        </Label>
                        <Input id="name" className="col-span-3" onChange={(e)=>setName(e.target.value)}/>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-4">
                        <Label htmlFor="regno" className="text-right">
                          Reg No
                        </Label>
                        <Input id="regno" className="col-span-3" onChange={(e)=>setRegNo(e.target.value)}/>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-4">
                        <Label htmlFor="department" className="text-right">
                          Department
                        </Label>
                        <Input id="department" className="col-span-3" onChange={(e)=>setDept(e.target.value)}/>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-4">
                        <Label htmlFor="year" className="text-right">
                          Year
                        </Label>
                        <Select onValueChange={(val)=>setYear(val)}
                            value={year}
                        >
                          <SelectTrigger className="col-span-3">
                            <SelectValue placeholder="Select year" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1">1st Year</SelectItem>
                            <SelectItem value="2">2nd Year</SelectItem>
                            <SelectItem value="3">3rd Year</SelectItem>
                            <SelectItem value="4">4th Year</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-4">
                        <Label htmlFor="gender" className="text-right">
                          Gender
                        </Label>
                        <Select onValueChange={(val)=>setGender(val)}
                            value={gender}>
                          <SelectTrigger className="col-span-3">
                            <SelectValue placeholder="Select gender" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="male">Male</SelectItem>
                            <SelectItem value="female">Female</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-4">
                        <Label htmlFor="phone" className="text-right">
                          Phone No
                        </Label>
                        <Input id="phone" className="col-span-3" onChange={(e)=>setPhno(e.target.value)}/>
                      </div>
                      <Button type="submit" className="mt-4" onClick={handleSubmitClick}>Submit</Button>
                    </div>
                  </DialogContent>
                </Dialog> */}
                <CreateTeamDialog email={data?.user?.email} />
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 hover:from-pink-600 hover:via-purple-600 hover:to-blue-600 text-xl px-8 py-4 sm:px-12 sm:py-8 rounded-2xl shadow-lg shadow-purple-500/20"
                >
                  <UsersIcon className="mr-3 h-6 w-6" />
                  Join Team
                </Button>
              </>
            ) : (
              <div className="text-center mb-16">
                <h2 className="text-3xl sm:text-4xl font-semibold mb-6">Team Details</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                  {teamDetails?.map((member, index) => (
                    <div key={index} className="bg-gray-800 p-6 rounded-lg shadow-lg">
                      <h3 className="text-xl font-bold mb-2">{member.name}</h3>
                      <p>{member.year} - {member.dept}</p>
                      {member.isTeamLead && <p className="text-green-500 mt-2">Team Lead</p>}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
          <div className="relative">
            {rounds.map((round, index) => (
              <div key={round.id} className="relative">
                {index < rounds.length - 1 && (
                  <TimelineConnector isCompleted={round.status === 'completed'} />
                )}
                <RoundCard
                  round={round}
                  position={index % 2 === 0 ? 'left' : 'right'}
                />
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default App;