import 'reflect-metadata'
import { Controller, Get, Post, Put, Route, Body, SuccessResponse } from 'tsoa'

export interface CountResponse {
  count: number
}

export interface IncrementRequest {
  increment: number
}

export interface SetValueRequest {
  value: number
}

// In-memory store for the count (in a real app, this would be a database)
let currentCount = 0

@Route('api/count')
export class CountController extends Controller {
  /**
   * Get the current count value
   */
  @Get()
  @SuccessResponse('200', 'Count retrieved successfully')
  public async getCount(): Promise<CountResponse> {
    this.setHeader('My-Commit-Id', process.env.COMMIT_ID || 'unknown')
    this.setHeader('My-Build-Time', process.env.BUILD_TIME || 'unknown')
    this.setHeader('My-Deploy-Time', process.env.DEPLOY_TIME || 'unknown')

    return { count: currentCount }
  }

  /**
   * Increment the count by a specified amount
   */
  @Post()
  @SuccessResponse('200', 'Count incremented successfully')
  public async incrementCount(@Body() request: IncrementRequest): Promise<CountResponse> {
    this.setHeader('My-Commit-Id', process.env.COMMIT_ID || 'unknown')
    this.setHeader('My-Build-Time', process.env.BUILD_TIME || 'unknown')
    this.setHeader('My-Deploy-Time', process.env.DEPLOY_TIME || 'unknown')

    currentCount += request.increment
    return { count: currentCount }
  }

  /**
   * Set the count to a specific value
   */
  @Put()
  @SuccessResponse('200', 'Count updated successfully')
  public async setCount(@Body() request: SetValueRequest): Promise<CountResponse> {
    this.setHeader('My-Commit-Id', process.env.COMMIT_ID || 'unknown')
    this.setHeader('My-Build-Time', process.env.BUILD_TIME || 'unknown')
    this.setHeader('My-Deploy-Time', process.env.DEPLOY_TIME || 'unknown')

    currentCount = request.value
    return { count: currentCount }
  }
}
