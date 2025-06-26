
import React, { Component, ErrorInfo, ReactNode } from 'react'
import { handleError } from '../utils/errorHandler'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { AlertTriangle, RefreshCw } from 'lucide-react'

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
  error?: Error
  errorId?: string
}

export class EnhancedErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): State {
    return { 
      hasError: true, 
      error,
      errorId: Date.now().toString(36) // Simple error ID
    }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log error using the available handleError function
    handleError(error, 'EnhancedErrorBoundary')
    console.error('Error details:', {
      componentStack: errorInfo.componentStack,
      errorBoundary: true,
      errorId: this.state.errorId
    })
  }

  handleReset = () => {
    this.setState({ hasError: false, error: undefined, errorId: undefined })
  }

  handleReload = () => {
    window.location.reload()
  }

  createUserFriendlyMessage = (error: Error): string => {
    if (error.message.includes('Network')) return 'Network connection issue. Please check your internet.'
    if (error.message.includes('Unauthorized')) return 'Authentication required. Please log in again.'
    if (error.message.includes('404')) return 'The requested resource was not found.'
    return 'An unexpected error occurred. Please try again.'
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback
      }

      const userMessage = this.state.error 
        ? this.createUserFriendlyMessage(this.state.error)
        : 'Something went wrong'

      return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-hero p-4">
          <Card className="max-w-md w-full bg-white/90 border-vintage-red/30 shadow-xl">
            <CardHeader className="text-center">
              <div className="mx-auto w-12 h-12 bg-vintage-red/10 rounded-full flex items-center justify-center mb-4">
                <AlertTriangle className="w-6 h-6 text-vintage-red" />
              </div>
              <CardTitle className="text-tabloid-black">
                Oops! Something went wrong
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-600 text-center">
                {userMessage}
              </p>
              
              {this.state.errorId && (
                <p className="text-xs text-gray-400 text-center">
                  Error ID: {this.state.errorId}
                </p>
              )}
              
              <div className="flex gap-2">
                <Button 
                  onClick={this.handleReset}
                  className="flex-1"
                  variant="outline"
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Try Again
                </Button>
                <Button 
                  onClick={this.handleReload}
                  className="flex-1"
                  variant="default"
                >
                  Reload Page
                </Button>
              </div>
              
              <div className="text-center">
                <Button
                  variant="link"
                  size="sm"
                  onClick={() => window.history.back()}
                  className="text-vintage-red"
                >
                  Go Back
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )
    }

    return this.props.children
  }
}
