import * as React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { motion } from "framer-motion";
const variants = {
  hidden: { opacity: 0, y: -50 }, // Start position for the animation
  visible: (i) => ({
    opacity: 1,
    y: 5,
    transition: {
      delay: i * 0.1, // Delay each row based on its index
      duration: 0.5, // Duration of the animation
      type: "spring", // Use a spring type animation for a bounce effect
      stiffness: 100, // Spring stiffness, adjust for more/less bounce
      damping: 10, // Spring damping, adjust to change how the bounce behaves
    },
  }),
};
export default function TableComponent({ data, title }) {
  const keys = Object.keys(data[0] || {})?.filter(key => key !== 'id' && key !== 'createdAt' && key !== 'updatedAt'); // Exclude 'id' from the table columns
  console.log(keys)
return (
    <>
    <TableContainer component={Paper} className="p-4 mb-8">
        <h2 className="text-2xl font-semibold mb-4">{title}</h2>
        <Table aria-label="simple table">
            <TableHead>
                <TableRow>
                    {keys.map((key) => (
                        <TableCell key={key} align="left">
                            {key === 'imagePath' ? "View" : key.charAt(0).toUpperCase() + key.slice(1)}
                        </TableCell>
                    ))}
                </TableRow>
            </TableHead>
            <TableBody>
                {data.map((row, index) => (
                    <motion.tr
                                                    key={row.id}
                                                    variants={variants} // Apply the defined variants
                                                    initial="hidden" // Start with the 'hidden' variant
                                                    custom={index} // Pass the index to the 'visible' variant for staggered animation
                                                    animate="visible" // Animate to the 'visible' variant
                                                >
                        {keys.map((key) => (
                            <TableCell key={key} align="left">
                                {key === 'imagePath' ? (
                                    row[key] ? <img src={row[key]} alt={key} style={{ width: '50px', height: '50px' }} /> : '-'
                                ) : (
                                    row[key] ? row[key] : '-'
                                )}
                            </TableCell>
                        ))}
                    </motion.tr>
                ))}
            </TableBody>
        </Table>
    </TableContainer>
    </>
);
}