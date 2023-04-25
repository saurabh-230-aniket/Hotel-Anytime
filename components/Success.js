import React from 'react';

function Success(props) {
    return (
        <div>
            <div class="alert alert-success text-center" role="alert">
                {props.message}
            </div>
        </div>
    );
}

export default Success;