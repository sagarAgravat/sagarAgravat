import React, { useEffect, useRef, useState } from 'react'
import { Button, Container } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { ARRAY_OF_DRAGGABLE_ELEMENTS, PROJECT_ROUTES_ENUMS } from '../Constants/Constants'
import { getUserName, validateUser } from '../utils/checkUser'

type Props = {}

const Home = (props: Props) => {
    const navigate = useNavigate()

    const [user, setUser] = useState('')
    const [draggedElement, setDraggedElement] = useState<number>(0)

    const publicContainer = useRef<HTMLDivElement>(null)
    const privateContainer = useRef<HTMLDivElement>(null)

    const [userAPublicArray, setUserAPublicArray] = useState([] as Array<number>)
    const [userAPrivateArray, setUserAPrivateArray] = useState([] as Array<number>)

    const initialArray = ARRAY_OF_DRAGGABLE_ELEMENTS

    useEffect(() => {
        /* To get User Name */
        const userEmail = localStorage.getItem('loginUser')
        if (userEmail) {
            setUser(getUserName(userEmail)!)
        }

        /* To show moved item as it is if user will refresh the page */

        const publicArray = JSON.parse(localStorage.getItem('publicArray')!)
        if (!publicArray) {
            setUserAPublicArray(initialArray)
            setUserAPrivateArray([])
        }

        if (publicArray) {
            setUserAPublicArray(publicArray)
            const newPrivateArray = initialArray.filter(element => !publicArray.includes(element))
            setUserAPrivateArray([...newPrivateArray])
        }
        return () => { };
    }, [])

    /**
    * 
    * @function handleDrop
    * @return void
    * @param event
    * @description To change public and private side we just remove and add the string to array responsible for draggable element and save the content of array to localStorage.
     */
    const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault()

        const email = localStorage.getItem('loginUser')
        if (!email || !validateUser(email!, user)) {
            navigate(PROJECT_ROUTES_ENUMS.PUBLIC_ROUTES.LOGIN_PAGE)
        }

        const clientX = event.clientX
        if (privateContainer.current && clientX > privateContainer.current.offsetLeft) {
            if (!userAPrivateArray.includes(draggedElement)) {
                localStorage.setItem('publicArray', JSON.stringify(userAPublicArray.filter((block: number) => block !== draggedElement)))
                setUserAPublicArray(userAPublicArray => userAPublicArray.filter(block => block !== draggedElement))
                const privateArray = [...userAPrivateArray]
                privateArray.push(draggedElement)
                setUserAPrivateArray(privateArray)
            }
        }
        if (publicContainer.current && clientX < publicContainer.current.offsetLeft + publicContainer.current.offsetWidth) {
            if (!userAPublicArray.includes(draggedElement)) {
                setUserAPrivateArray(userAPrivateArray => userAPrivateArray.filter(block => block !== draggedElement))
                const publicArray = [...userAPublicArray]
                publicArray.push(draggedElement)
                setUserAPublicArray(publicArray)
                localStorage.setItem('publicArray', JSON.stringify(publicArray))
            }
        }

    }


    /**
    * 
    * @function handleDragOver
    * @return void
    * @param event
    * @description To make possible that we have get onDrop event on publicContainer and privateContainer we have to make handleDragOver to preventDefault.
     */

    const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
    };

    /**
  * 
  * @function dragStart
  * @return void
  * @param event
  * @description Store which element is dragged.
   */

    const dragStart = (event: React.DragEvent<HTMLDivElement>) => {
        const element = event.target as HTMLDivElement;
        setDraggedElement(Number(element.id))
    }

    /**
      * 
      * @function handleLogout
      * @return void
      * @description remove all item form localStorage and navigate user to login page 
       */
    const handleLogout = () => {
        localStorage.clear();
        navigate(PROJECT_ROUTES_ENUMS.PUBLIC_ROUTES.LOGIN_PAGE)
    }


    return (
        <Container className='main-div d-flex align-items-center justify-content-center'>
            <div className='w-75 h-75 bg-light'>
                <div className='row p-3 h-100'>
                    <div className='col-2 h-100 bg-secondary border p-3 d-flex flex-column justify-content-between'>
                        <h2 className='text-light text-center my-5'>{user}</h2>
                        <Button className='my-5 btn-light d-block mx-auto' onClick={handleLogout}>Logout</Button>
                    </div>
                    <div className="col-10 h-100 border">
                        <div className='row h-100 p-5'>
                            <div className='col-6 border' >
                                <h3 className='text-center'>Public</h3>
                                <div className='h-90 d-flex flex-column p-5' ref={publicContainer} onDrop={(event) => handleDrop(event)} onDragOver={(event) => handleDragOver(event)}>
                                    {
                                        userAPublicArray.map((element: number, index: number) => {
                                            return (
                                                <div id={`${element}`} key={`${index}-${element}`} onDragStart={(event) => dragStart(event)} draggable={true} className='single-element text-center border mt-4 d-flex align-items-center justify-content-center'>
                                                    Dom Block {element}
                                                </div>)
                                        })
                                    }
                                </div>
                            </div>
                            <div className='col-6 border' >
                                <h3 className='text-center'>Private</h3>
                                <div className='h-90 d-flex flex-column p-5' ref={privateContainer} onDrop={(event) => handleDrop(event)} onDragOver={(event) => handleDragOver(event)}>
                                    {
                                        userAPrivateArray.map((element: number, index: number) => {
                                            return (
                                                <div id={`${element}`} key={`${index}-${element}`} onDragStart={(event) => dragStart(event)} draggable={true} className='single-element text-center border mt-4 d-flex align-items-center justify-content-center'>
                                                    Dom Private {element}
                                                </div>)
                                        })
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    )
}

export default Home
