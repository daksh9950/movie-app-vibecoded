import React from 'react'

function Dropdown({title, options, func}) {
    return (
        <div className='select' >
            <select name="format" defaultValue="0" id="format" onChange={func} className='bg-zinc-800 text-white p-2 rounded-md border-none outline-none cursor-pointer'>
                <option value="0" disabled>
                    {title}
                </option>
                {options.map((o, i) => {
                    const value = typeof o === 'object' ? o.value : o;
                    const label = typeof o === 'object' ? o.label : o;
                    return (
                        <option key={i} value={value} >{label.toUpperCase()}</option>
                    )
                })}
            </select>
        </div>
    )
}

export default Dropdown
