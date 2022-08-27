import { useState, useCallback, useContext } from 'react';
import { firebaseDbUrl } from '../../firebase-config';
import AuthGoogleContext from '../authentication/auth-google-context';

const useHttp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const authGoogleContext = useContext(AuthGoogleContext)
  const localId = authGoogleContext.localId;
  const token = authGoogleContext.token;
  const authToken = authGoogleContext.authToken;

  const parseResult = (_result) => {
    let response = [];
    let _keys = Object.keys(_result)
    for (let i = 0; i < _keys.length; i++) {
      let _o = _result[_keys[i]];
      _o['id'] = _keys[i]
      response.push(_o)
    }

    return response;

  }

  const sendRequest = useCallback(async (requestConfig, applyData) => {
    setIsLoading(true);
    setError(null);
    try {

      var _url = firebaseDbUrl + requestConfig.url

      if (_url.indexOf("?") < 0) {
        _url += "?"
      } else {
        _url += "&"
      }

      _url += "access_token=" + token + "&auth=" + authToken;

      const response = await fetch(_url, {
        method: requestConfig.method ? requestConfig.method : 'GET',
        headers: requestConfig.headers ? requestConfig.headers : {},
        body: requestConfig.body ? JSON.stringify(requestConfig.body) : null,
      });

      if (!response.ok) {
        throw new Error('Request failed!');
      }

      const data = await response.json();
      applyData(data);
    } catch (err) {
      setError(err.message || 'Something went wrong!');
    }
    setIsLoading(false);
  }, []);

  return {
    isLoading,
    error,
    sendRequest,
    localId,
    parseResult
  };
};

export default useHttp;