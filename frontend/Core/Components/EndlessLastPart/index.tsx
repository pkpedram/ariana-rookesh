import React, { useRef } from 'react'
import { RootState } from '../../Redux/store'
import { connect } from 'react-redux'
import { filterActions } from '../../Redux/Actions'
import useRefFetch from '../../Utils/Hooks/useRefFetch'

type EndlessPartProps = {
    hasMore: boolean,
    nextOffset: string,
    generateParams: Function,
    ordering: string
}

const EndlessLastPart = ({hasMore, nextOffset, generateParams, ordering} : EndlessPartProps) => {

    const ref = useRef<HTMLDivElement>(null)

    const requestNextFetch = () => {
        if(hasMore){
            generateParams({
                offset: nextOffset,
                order: ordering
            })
        }
    }

  if(typeof window !== 'undefined'){
    useRefFetch(ref, requestNextFetch, hasMore)

  }
    
  return (
    <div ref={ref}></div>
  )
}

const mapStateToProps = (state : RootState) => ({
    hasMore: state.filterState.hasMore,
    nextOffset: state.filterState.nextOffset,
    ordering: state.productState.ordering
})
const mapDispatchToProps = {
    generateParams: filterActions.generateParams
}

export default connect(mapStateToProps, mapDispatchToProps)(EndlessLastPart)