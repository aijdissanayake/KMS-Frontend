import { Box, SimpleGrid } from '@chakra-ui/react';
import ColumnsTable from 'views/admin/dataTables/components/ColumnsTable';
import { columnsDataColumns } from 'views/admin/dataTables/variables/columnsData';
import tableDataColumns from 'views/admin/dataTables/variables/tableDataColumns.json';
import React from 'react';

export default function Settings() {
  return (
    <Box pt={{ base: '130px', md: '80px', xl: '80px' }}>
      <SimpleGrid>
        <ColumnsTable
          columnsData={columnsDataColumns}
          tableData={tableDataColumns}
        />
      </SimpleGrid>
    </Box>
  );
}
