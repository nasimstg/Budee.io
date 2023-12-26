import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter
  } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
  
export default function Dialogue({title, data}) {
  return (
    <Dialog>
    <DialogTrigger asChild>
        <Button variant="outline" className="rounded-2xl">
            {title}
        </Button>
    </DialogTrigger>
    <DialogContent>
        <DialogHeader>
            <DialogTitle>{data.process}</DialogTitle>    
            <DialogDescription>
                {data.des}
            </DialogDescription>
        </DialogHeader>
            {data.comp}
        <DialogFooter>
        <Button type="submit">{data.btnTxt}</Button>
        </DialogFooter>
    </DialogContent>
    </Dialog>

  )
}
