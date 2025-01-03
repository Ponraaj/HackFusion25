"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Copy } from "lucide-react";
import axios from "axios";

import { useToast } from "@/hooks/use-toast";

const CreateTeamDialog = ({ email, setFlag }: { email: string, setFlag: React.Dispatch<React.SetStateAction<boolean>> }) => {
  const { toast } = useToast();
  const [name, setName] = useState<string>("");
  const [regNo, setRegNo] = useState<string>("");
  const [dept, setDept] = useState<string>("");
  const [year, setYear] = useState<string>("");
  const [gender, setGender] = useState<string>("");
  const [phno, setPhno] = useState<string>("");
  const [teamName, setTeamName] = useState<string>("");

  const [isCreateTeamDialogOpen, setIsCreateTeamDialogOpen] = useState(false);
  const [isTeamIdDialogOpen, setIsTeamIdDialogOpen] = useState(false);
  const [teamId, setTeamId] = useState<string>("");

  const handleSubmitClick = async () => {
    try {
      const res = await axios.post("/api/users/createteam", {
        teamName,
        teamLead: {
          name,
          email,
          gender,
          regNo,
          dept,
          year,
          phoneno: phno,
        },
      });
      setIsCreateTeamDialogOpen(false);

      setTeamId(res.data.teamId);
      setIsTeamIdDialogOpen(true);
    } catch (error) {
      console.log(error);
      toast({
        title: "Error",
        description: "Failed to create team",
        variant: "destructive",
      });
    }
  };

  const handleCopyTeamId = () => {
    navigator.clipboard
      .writeText(teamId)
      .then(() => {
        toast({
          title: "Copied",
          description: "Team ID copied to clipboard",
        });
        setIsTeamIdDialogOpen(false);
        setFlag((flag: boolean) => !flag);
      })
      .catch((error) => {
        console.log(error);
        toast({
          title: "Error",
          description: "Failed to copy Team ID",
          variant: "destructive",
        });
      });
  };

  return (
    <>
      <Dialog
        open={isCreateTeamDialogOpen}
        onOpenChange={setIsCreateTeamDialogOpen}
      >
        <DialogTrigger asChild>
          <Button
            size="lg"
            className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 text-xl px-8 py-4 sm:px-12 sm:py-8 rounded-2xl shadow-lg shadow-purple-500/20"
          >
            Create Team
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px] text-purple-600">
          <DialogHeader>
            <DialogTitle>Create Team</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-4">
              <Label htmlFor="teamName" className="text-right">
                Team Name
              </Label>
              <Input
                id="teamName"
                className="col-span-3"
                value={teamName}
                onChange={(e) => setTeamName(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                className="col-span-3"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-4">
              <Label htmlFor="regno" className="text-right">
                Reg No
              </Label>
              <Input
                id="regno"
                className="col-span-3"
                value={regNo}
                onChange={(e) => setRegNo(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-4">
              <Label htmlFor="department" className="text-right">
                Department
              </Label>
              <Input
                id="department"
                className="col-span-3"
                value={dept}
                onChange={(e) => setDept(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-4">
              <Label htmlFor="year" className="text-right">
                Year
              </Label>
              <Select onValueChange={(val) => setYear(val)} value={year}>
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
              <Select onValueChange={(val) => setGender(val)} value={gender}>
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
              <Input
                id="phone"
                className="col-span-3"
                value={phno}
                onChange={(e) => setPhno(e.target.value)}
              />
            </div>
            <Button
              type="submit"
              className="mt-4 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:from-blue-600 hover:via-purple-600 hover:to-pink-600"
              onClick={handleSubmitClick}
            >
              Submit
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={isTeamIdDialogOpen} onOpenChange={setIsTeamIdDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Team Created Successfully</DialogTitle>
            <DialogDescription>
              Your team has been created. Please copy and save your Team ID.
            </DialogDescription>
          </DialogHeader>
          <div className="flex items-center gap-2">
            <Input value={teamId} readOnly className="flex-grow" />
            <Button variant="outline" size="icon" onClick={handleCopyTeamId}>
              <Copy className="h-4 w-4" />
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CreateTeamDialog;
