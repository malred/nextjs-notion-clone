// lib/openai.ts
import {Configuration, OpenAIApi} from 'openai-edge'

const config = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
    basePath: process.env.BASE_URL
})

const openai = new OpenAIApi(config)

export async function generateImagePrompt(name: string) {
    try {
        // const response = await openai.createChatCompletion({
        //     model: 'gpt-3.5-turbo',
        //     messages: [
        //         {
        //             role: 'system',
        //             content: 'You are a creative and helpful AI assistance capable of generating interesting thumbnail descriptions for my notes. ' +
        //                 'Your output will be fed into the DALLE API to generate a thumbnail. The description should be minimalistic and flat styled.'
        //         },
        //         {
        //             role: "user",
        //             content: `Please generate a thumbnail description for my notebook titles ${name}`
        //         }
        //     ]
        // })
        // const data = await response.json()
        // const image_description = data.choices[0].message.content
        // return image_description as string
        return 'test'
    } catch (e) {
        console.log(e)
        throw e
    }
}

export async function generateImage(image_description: string) {
    try {
        // const response = await openai.createImage({
        //     prompt: image_description,
        //     n: 1,
        //     size: '256x256'
        // })
        // const data = await response.json()
        // const image_url = da/ta.data[0].url
        // return image_url as string
        // return 'https://picsum.photos/256/256'
        return 'https://picsum.photos/256'
    } catch (e) {
        console.error(e)
    }
}