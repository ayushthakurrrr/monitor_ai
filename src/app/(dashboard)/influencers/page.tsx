'use client'

import { useEffect, useState, useTransition, useActionState } from 'react'
import { FilePenLine, PlusCircle, Trash2, Users } from 'lucide-react'

import {
  addInfluencerAction,
  deleteInfluencerAction,
  updateInfluencerAction,
  getInfluencersAction
} from './actions'
import type { Influencer } from '@/lib/data'

import { Button } from '@/components/ui/button'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { useToast } from '@/hooks/use-toast'
import { Skeleton } from '@/components/ui/skeleton'

const initialState = {
  message: null,
  errors: {},
}

function SubmitButton({ isPending, isEdit = false }: { isPending: boolean, isEdit?: boolean }) {
  return (
    <Button type="submit" disabled={isPending}>
      {isPending ? 'Saving...' : isEdit ? 'Save Changes' : 'Add Influencer'}
    </Button>
  )
}

function InfluencerForm({ influencer, onFormSubmit }: { influencer?: Influencer | null, onFormSubmit: () => void }) {
    const [isPending, startTransition] = useTransition();
    const { toast } = useToast();

    const action = influencer 
        ? updateInfluencerAction.bind(null, influencer.id) 
        : addInfluencerAction;
    const [state, formAction] = useActionState(action, initialState);

    useEffect(() => {
        if (state?.message) {
            toast({ title: 'Success', description: state.message });
            onFormSubmit();
        }
        if (state?.error) {
            toast({ variant: 'destructive', title: 'Error', description: state.error });
        }
    }, [state, toast, onFormSubmit]);
    
    return (
        <form action={(formData) => startTransition(() => formAction(formData))}>
            <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">Name</Label>
                    <Input id="name" name="name" defaultValue={influencer?.name} className="col-span-3" />
                </div>
                 {state.errors?.name && <p className="text-sm text-destructive col-start-2 col-span-3">{state.errors.name[0]}</p>}
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="handle" className="text-right">Handle</Label>
                    <Input id="handle" name="handle" defaultValue={influencer?.handle} className="col-span-3" />
                </div>
                 {state.errors?.handle && <p className="text-sm text-destructive col-start-2 col-span-3">{state.errors.handle[0]}</p>}
                 <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="channelId" className="text-right">Channel ID</Label>
                    <Input id="channelId" name="channelId" defaultValue={influencer?.channelId} className="col-span-3" />
                </div>
                 {state.errors?.channelId && <p className="text-sm text-destructive col-start-2 col-span-3">{state.errors.channelId[0]}</p>}
            </div>
            <DialogFooter>
                <DialogClose asChild>
                    <Button variant="outline">Cancel</Button>
                </DialogClose>
                <SubmitButton isPending={isPending} isEdit={!!influencer} />
            </DialogFooter>
        </form>
    )
}


export default function InfluencersPage() {
  const [influencers, setInfluencers] = useState<Influencer[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingInfluencer, setEditingInfluencer] = useState<Influencer | null>(null);

  const { toast } = useToast()

  const fetchAndSetInfluencers = async () => {
    setIsLoading(true)
    const data = await getInfluencersAction()
    setInfluencers(data)
    setIsLoading(false)
  }

  useEffect(() => {
    fetchAndSetInfluencers()
  }, [])

  const handleDelete = async (id: string) => {
    const result = await deleteInfluencerAction(id)
    if (result.error) {
      toast({ variant: 'destructive', title: 'Error', description: result.error })
    } else {
      toast({ title: 'Success', description: result.message })
      fetchAndSetInfluencers();
    }
  }
  
  const handleFormSubmit = () => {
    setIsFormOpen(false);
    setEditingInfluencer(null);
    fetchAndSetInfluencers();
  };

  const openAddDialog = () => {
    setEditingInfluencer(null);
    setIsFormOpen(true);
  }

  const openEditDialog = (influencer: Influencer) => {
    setEditingInfluencer(influencer);
    setIsFormOpen(true);
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="font-headline text-3xl font-semibold flex items-center gap-2">
            <Users /> Influencer List
        </h1>
        <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
            <DialogTrigger asChild>
                <Button onClick={openAddDialog}>
                    <PlusCircle className="mr-2 h-4 w-4" /> Add Influencer
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>{editingInfluencer ? 'Edit Influencer' : 'Add New Influencer'}</DialogTitle>
                    <DialogDescription>
                        {editingInfluencer ? 'Update the details for this influencer.' : 'Add a new influencer to track their content.'}
                    </DialogDescription>
                </DialogHeader>
                <InfluencerForm influencer={editingInfluencer} onFormSubmit={handleFormSubmit}/>
            </DialogContent>
        </Dialog>

      </div>
      <div className="overflow-hidden rounded-lg border shadow-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>YouTube Handle</TableHead>
              <TableHead>Channel ID</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              Array.from({ length: 4 }).map((_, i) => (
                <TableRow key={i}>
                  <TableCell><Skeleton className="h-5 w-32" /></TableCell>
                  <TableCell><Skeleton className="h-5 w-24" /></TableCell>
                  <TableCell><Skeleton className="h-5 w-24" /></TableCell>
                  <TableCell className="text-right space-x-2">
                    <Skeleton className="h-8 w-8 inline-block" />
                    <Skeleton className="h-8 w-8 inline-block" />
                  </TableCell>
                </TableRow>
              ))
            ) : influencers.length > 0 ? (
              influencers.map((influencer) => (
                <TableRow key={influencer.id}>
                  <TableCell className="font-medium">{influencer.name}</TableCell>
                  <TableCell>{influencer.handle}</TableCell>
                  <TableCell>{influencer.channelId}</TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button variant="ghost" size="icon" onClick={() => openEditDialog(influencer)}>
                      <FilePenLine className="h-4 w-4" />
                    </Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                          <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete the
                            influencer and all of their associated posts.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => handleDelete(influencer.id)}
                            className="bg-destructive hover:bg-destructive/90"
                          >
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </TableCell>
                </TableRow>
              ))
            ) : (
                <TableRow>
                    <TableCell colSpan={4} className="text-center">No influencers found. Add one to get started.</TableCell>
                </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
