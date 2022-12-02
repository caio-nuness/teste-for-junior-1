import React, { useState } from 'react'
import './App.css'

interface ClickedProps {
  clientX: number,
  clientY: number,
  timeStamp: number,
}

function App() {

  const [clickedPoints, setClickedPoints] = useState<ClickedProps[]>([])
  const [undoPoints, setUndoPoints] = useState<ClickedProps[]>([])

  function getCordenates(e: React.MouseEvent<HTMLElement>) {
    const {clientX, clientY, timeStamp} = e;
    setClickedPoints([...clickedPoints, {clientX, clientY, timeStamp}])
    console.log(clickedPoints)
  }

  const handleReturnState = () => {
    const newClickedPoints = [...clickedPoints]
    setClickedPoints(newClickedPoints)
    const undoPoint = newClickedPoints.pop()

    if( !undoPoint ) return
      setUndoPoints([...undoPoints, undoPoint])
  }

  const hendleRedo = () => {
    const newRedoPoints = [...undoPoints]
    const redoPoint = newRedoPoints.pop()
    setUndoPoints(newRedoPoints)

    if (!redoPoint) return
      setClickedPoints([...clickedPoints, redoPoint])
  }

  return (
    <>
    <button className='button-undo' disabled={clickedPoints.length === 0} onClick={handleReturnState}>Desfazer</button>
    <button className='button-redo' disabled={undoPoints.length === 0} onClick={hendleRedo}>Refazer</button>

      <div id="App" onClick={getCordenates}>
        {clickedPoints.map(( clickedPoint ) => {
          return (
            <div  
            key={clickedPoint.timeStamp}
              style={{
                left: clickedPoint.clientX - 20,
                top: clickedPoint.clientY - 20,
                position: 'absolute',
                background: 'red',
                borderRadius: '50%',
                width: 50,
                height: 50,
              }}
            />
          )
        })}
      </div>
    </>
  )
}

export default App 
