import { openai } from '@ai-sdk/openai'
import { generateText } from 'ai'
import { type PayloadHandler } from 'payload'
import { z } from 'zod'

export const generateAltText: PayloadHandler = async (req): Promise<Response> => {
  const { payload, user } = req

  if (!user) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    payload.logger.info('Generating alt text')

    const { id, aiGenerated } = z
      .object({
        id: z.string(),
        aiGenerated: z.boolean(),
      })
      .parse(await req.json?.())

    const doc = await payload.findByID({
      collection: 'media',
      id,
    })

    const image = await fetch(`${process.env.PAYLOAD_PUBLIC_SERVER_URL}${doc.url}`)
    const imageBuffer = await image.arrayBuffer()

    const { text } = await generateText({
      model: openai('chatgpt-4o-latest'),
      messages: [
        {
          role: 'user',
          content: [
            {
              type: 'text',
              text: `Describe the image in detail. Use up to 280 characters${aiGenerated ? '. The image is AI generated' : ''}`,
            },
            {
              type: 'image',
              image: imageBuffer,
            },
          ],
        },
      ],
    })

    return Response.json({ success: true, altText: text })
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error'
    payload.logger.error(message)
    return Response.json({ error: message }, { status: 500 })
  }
}
