import React from 'react'


interface ContainerProps {
    children: React.ReactNode
    // ClassName?: string
}

export default function Container(props: Readonly<ContainerProps>) {
  return (
    <div className='container p-8 mx-auto xl:px-12'>
        {props.children}
    </div>
  )
}
