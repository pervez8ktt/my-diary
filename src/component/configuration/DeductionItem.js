const DeductionItem = (props) => {
    const _obj = props.data;
    const sr = props.index+1;
    return <tr>
        <th scope="row">{sr}</th>
        <td>{_obj.title}</td>
        <td>{_obj.dType}</td>
        <td>{_obj.dValue}</td>
        <td><button onClick={props.updateDeductionHandler.bind(this,props.index)}>Update</button></td>
    </tr>
}

export default DeductionItem;