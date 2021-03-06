import AuthReducer from 'reducers/auth'
import * as ActionTypes from 'constants/ActionTypes'
import * as RemoteDataStates from 'constants/RemoteDataStates'


describe('AuthReducer', () => {

  it('changes state to loading after a login request', () => {
    const state = AuthReducer(undefined, { type: ActionTypes.LOGIN_REQUEST })
    expect(state.remoteDataState).toEqual(RemoteDataStates.LOADING)
  })

  it('changes state to loaded after successful login', () => {
    const state = AuthReducer(undefined, { type: ActionTypes.LOGIN_SUCCESS })
    expect(state.remoteDataState).toEqual(RemoteDataStates.LOADED)
  })

  it('changes state to error after login error', () => {
    const state = AuthReducer(undefined, { type: ActionTypes.LOGIN_ERROR })
    expect(state.remoteDataState).toEqual(RemoteDataStates.ERROR)
  })

  it('populates the error field after login error', () => {
    const state = AuthReducer(undefined, { type: ActionTypes.LOGIN_ERROR, error: 'something bad happened' })
    expect(state.error).toEqual('something bad happened')
  })

  it('changes state to not requested after logout', () => {
    const state = AuthReducer(undefined, { type: ActionTypes.LOGOUT })
    expect(state.remoteDataState).toEqual(RemoteDataStates.NOT_REQUESTED)
  })
})
