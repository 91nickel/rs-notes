import React from 'react'

interface IProps {
    children: React.ReactNode,
}

interface IState {
    hasError: boolean,
}

class ErrorBoundary extends React.Component<IProps, IState> {

    state: IState

    constructor(props: IProps | Readonly<IProps>) {
        super(props)
        this.state = {
            hasError: false,
        }
    }

    static getDerivedStateFromError(error: Error) {
        console.log('####: error', error)
        return {
            hasError: true,
        }
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
        console.log('####: error', error)
        console.log('####: errorInfo', errorInfo)
        // Всю дополнительную логику сюда
    }

    render() {
        if (this.state.hasError)
            return (
                <div className="alert alert-danger" role="alert">
                    Something went wrong...
                </div>
            )
        return this.props.children
    }
}

export default ErrorBoundary
