import { Get, Route, SuccessResponse, Controller } from 'tsoa'

interface PingResponse {
  message: string
}

@Route('api/ping')
export class PingController extends Controller {
  @Get('/')
  @SuccessResponse('200', 'Ping response')
  public async getMessage(): Promise<PingResponse> {
    this.setHeader('My-Commit-Id', process.env.COMMIT_ID || 'unknown')
    this.setHeader('My-Build-Time', process.env.BUILD_TIME || 'unknown')
    this.setHeader('My-Deploy-Time', process.env.DEPLOY_TIME || 'unknown')
    return {
      message: 'pong',
    }
  }
}
