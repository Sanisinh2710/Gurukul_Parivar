import React, {ErrorInfo, ReactNode} from 'react';
import {StyleSheet, View} from 'react-native';
import {NoData} from '../../ui';
interface Props {
  children: ReactNode;
}
interface State {
  hasError: boolean;
}
class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {hasError: false};
  }

  static getDerivedStateFromError(_: Error): State {
    // Update state so the next render will show the fallback UI.
    return {hasError: true};
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // You can also log the error to an error reporting service
    console.log('componentDidCatch ', error, ' ', errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <View style={styles.container}>
          <NoData
            title="Oops..! An error occurred..!"
            content={
              'Our team has taken a note of this issue.' +
              '\n' +
              'Please restart your app again to continue..!'
            }
          />
        </View>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  message: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
    paddingHorizontal: 10,
  },
});
