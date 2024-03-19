



const Select = (props:any)=>{


    return (
      <>
        <select
          id={props.id}
          {...props.register(props.id, props.options)}
          className={
              props.error
                  ? "w-full rounded-lg border-2 p-4 pe-12 text-sm shadow-sm !border-red-600 focus:!outline-red-600"
                  : "w-full  rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm focus:outline-blue-500"
          }
        >
          {props.data.map((e:any, index:number) => (
            <option key={index} value={e.item}>
              {e.item}
            </option>
          ))}
        </select>
      </>
    );
}

export default Select