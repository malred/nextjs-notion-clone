import {writeFile, opendir, mkdir} from 'fs/promises'
import {NextRequest, NextResponse} from 'next/server'

export async function POST(request: NextRequest) {
    const data = await request.formData()
    const file: File | null = data.get('file') as unknown as File
    let url: string | null = data.get('url') as unknown as string

    if (!file) {
        return NextResponse.json({success: false})
    }

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // 这里是你要进行保存的文件目录地址
    // const path = `./public/tmp/${file.name}`
    const path = `./public${url}`
    const dir = `./public${url.replace(file.name, '')}`

    // 检查目录是否存在
    try {
        await opendir(dir)
    } catch (e) {
        await mkdir(dir)
        console.error(e)
    }
    await writeFile(path, buffer)
    console.log(`open ${path} to see the uploaded file`)

    return NextResponse.json({success: true})
}