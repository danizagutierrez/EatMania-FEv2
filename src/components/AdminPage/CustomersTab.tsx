import { ButtonGroup, Button } from 'react-bootstrap';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { RootState } from '../../store/store';
import { useEffect, useState } from 'react';
import { deleteCustomers } from '../../store/slices/auth';
import CustomerCard from './CustomerCard';

const CustomersTab = () => {
    const dispatch = useAppDispatch();

    const customers = useAppSelector((state: RootState) => state.auth.userList);

    const [selectedCustomers, setSelectedCustomers] = useState<number[]>([]);
    useEffect(() => {
        setSelectedCustomers([]);
    }, [customers]);

    const handleDelete = () => {
        if (selectedCustomers.length) {
            dispatch(deleteCustomers(selectedCustomers));
        }
    };
    const handleCheckboxChange = (checked: boolean, value: string | number) => {
        if (checked) {
            setSelectedCustomers((prevList) => [...prevList, Number(value)]); // Add value to the selected list
        } else {
            setSelectedCustomers((prevList) => prevList.filter((item) => item !== Number(value))); // Remove value from the selected list
        }
    };
    return (
        <div>
            <div className="mb-5 management-header">
                <h1>Customer Management</h1>
                <ButtonGroup>
                    <Button>Add</Button>
                    <Button>Edit</Button>
                    <Button onClick={() => handleDelete()}>Delete</Button>
                </ButtonGroup>
            </div>
            {customers.length &&
                customers
                    .filter((r) => !r.is_admin)
                    .map((r) => (
                        <CustomerCard
                            r={r}
                            key={r.id}
                            handleCheckboxChange={handleCheckboxChange}
                        />
                    ))}
        </div>
    );
};

export default CustomersTab;
