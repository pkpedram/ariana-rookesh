import React from "react"
import logo from '../../../public/assets/image/logo.png'
import Image from "next/image"

class ErrorBoundary extends React.Component {
    constructor(props) {
      super(props)
   
      // Define a state variable to track whether is an error or not
      this.state = { hasError: false }
    }
    static getDerivedStateFromError(error) {
      // Update state so the next render will show the fallback UI
   
      return { hasError: true }
    }
    componentDidCatch(error, errorInfo) {
      // You can use your own error logging service here
      console.log({ error, errorInfo })
    }
    render() {
      // Check if the error is thrown
      if (this.state.hasError) {
        // You can render any custom fallback UI
        return (
          <div className="w-full flex flex-col items-center pb-40">
            <Image src={logo} alt="لوگو" />
            <h2 className="text-2xl text-main-blue font-bold mb-3">مشکلی پیش آمده است!</h2>
            <button
            className="w-40 h-10 rounded-md bg-main-blue text-white"
              type="button"
              onClick={() => this.setState({ hasError: false })}
            >
              امتحان دوباره؟
            </button>
          </div>
        )
      }
   
      // Return children components in case of no error
   
      return this.props.children
    }
  }
   
  export default ErrorBoundary