'use server'

import { z } from 'zod'
import { addInfluencer, deleteInfluencer, updateInfluencer, getInfluencers, type Influencer } from '@/lib/data'
import { revalidatePath } from 'next/cache'

const influencerSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  handle: z.string().min(2, { message: 'Handle must be at least 2 characters.' }),
  channelId: z.string().min(2, { message: 'Channel ID must be at least 2 characters.' }),
})

export async function getInfluencersAction(): Promise<Influencer[]> {
  const influencers = await getInfluencers()
  return JSON.parse(JSON.stringify(influencers));
}

export async function addInfluencerAction(prevState: any, formData: FormData) {
  const validatedFields = influencerSchema.safeParse({
    name: formData.get('name'),
    handle: formData.get('handle'),
    channelId: formData.get('channelId'),
  })

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    }
  }

  try {
    await addInfluencer(validatedFields.data)
    revalidatePath('/influencers')
    return { message: 'Influencer added successfully.' }
  } catch (error) {
    return { error: 'Failed to add influencer.' }
  }
}

export async function updateInfluencerAction(id: string, prevState: any, formData: FormData) {
  const validatedFields = influencerSchema.safeParse({
    name: formData.get('name'),
    handle: formData.get('handle'),
    channelId: formData.get('channelId'),
  })

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    }
  }

  try {
    await updateInfluencer(id, validatedFields.data)
    revalidatePath('/influencers')
    return { message: 'Influencer updated successfully.' }
  } catch (error) {
    return { error: 'Failed to update influencer.' }
  }
}


export async function deleteInfluencerAction(id: string) {
  try {
    await deleteInfluencer(id)
    revalidatePath('/influencers')
    return { message: 'Influencer deleted successfully.' }
  } catch (error) {
    return { error: 'Failed to delete influencer.' }
  }
}