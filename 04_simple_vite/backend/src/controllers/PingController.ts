import { Get, Route, SuccessResponse, Controller } from 'tsoa'
import { backendConfig } from '../config/config.js'

interface PingResponse {
  message: string
}

@Route('api/ping')
export class PingController extends Controller {
  @Get('/')
  @SuccessResponse('200', 'Ping response')
  public async getMessage(): Promise<PingResponse> {
    this.setHeader('My-Commit-Id', backendConfig.commitId)
    this.setHeader('My-Build-Time', backendConfig.buildTime)
    this.setHeader('My-Deploy-Time', backendConfig.deployTime)

    return {
      message: 'pong',
    }
  }
}
