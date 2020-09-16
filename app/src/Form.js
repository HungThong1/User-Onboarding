import React from 'react'


export default function UserForm(props) {
    const { values, change, submit, disabled, errors } = props

    const onChange = evt => {
        const { name, value } = evt.target
        change(name, value)
    }

    const onSubmit = evt => {
        evt.preventDefault()
        submit()
    }


    return (
        <form onSubmit={onSubmit}>
            <div>
                <h2>Add a user</h2>
                <button disabled={disabled}>Submit</button>
                <div>
                    <div>{errors.name}</div>
                    <div>{errors.email}</div>
                    <div>{errors.password}</div>
                    <div>{errors.tos}</div>
                </div>
            </div>

            <div>
                <h4>Information</h4>
                <label>Name
                    <input
                        value={values.name}
                        onChange={onChange}
                        name='name'
                        type='text'
                    />
                </label>

                <label>Email
                    <input
                        value={values.email}
                        onChange={onChange}
                        name='email'
                        type='text'
                    />
                </label>

                <label>Password
                    <input
                        value={values.password}
                        onChange={onChange}
                        name='password'
                        type='text'
                    />
                </label>
                
                    <p>Terms of Service</p>
                    <p>Do you agree to the terms of Service?</p>
                <label>Yes
                    <input
                    type='radio'
                    name='tos'
                    value='true'
                    checked={values.tos === 'true'}
                    onChange={onChange}
                />
                </label>
                

                <label>No
                    <input
                    type='radio'
                    name='tos'
                    value='false'
                    checked={values.tos === 'false'}
                    onChange={onChange}
                />
                </label>
            </div>
        </form>
    )

}