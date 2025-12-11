// CustomDataTable.jsx
import React, { useState, useEffect } from 'react';
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarDensitySelector,
  GridToolbarQuickFilter,
} from '@mui/x-data-grid';
import { Box, styled } from '@mui/material';

/**
 * ================================
 *   TYPE DEFINITIONS (JSDoc)
 * ================================
 */

/**
 * @typedef {import('@mui/x-data-grid').GridColDef} GridColDef
 * @typedef {import('@mui/x-data-grid').GridRowId} GridRowId
 * @typedef {import('@mui/x-data-grid').GridRowSelectionModel} GridRowSelectionModel
 */

/**
 * @typedef {Object} CustomToolbarOptions
 * @property {boolean} [search]
 * @property {{ xlsx?: boolean, csv?: boolean }} [export]
 * @property {{ xlsx?: boolean, csv?: boolean }} [import]
 * @property {boolean} [column]
 * @property {boolean} [density]
 */

/**
 * @typedef {Object} CustomDataTableProps
 * @property {Array<any>} [rows]
 * @property {GridColDef[]} [columns]
 * @property {boolean} [checkbox]
 * @property {number} [pageSize]
 * @property {boolean} [pagination]
 * @property {CustomToolbarOptions} [toolbar]
 * @property {boolean} [loading]
 * @property {(ids: GridRowSelectionModel, selectedItems: any[]) => void} [onSelectedRowsChange]
 * @property {(params:any)=>boolean} [isRowSelectable]
 * @property {(row:any)=>GridRowId} [getRowId]
 */

/**
 * ================================
 *   NO ROWS OVERLAY
 * ================================
 */
const StyledGridOverlay = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100%',
  '& .no-rows-primary': {
    fill: '#3D4751',
    ...theme.applyStyles('light', { fill: '#AEB8C2' }),
  },
  '& .no-rows-secondary': {
    fill: '#1D2126',
    ...theme.applyStyles('light', { fill: '#E8EAED' }),
  },
}));

function CustomNoRowsOverlay() {
  return (
    <StyledGridOverlay>
      <Box sx={{ mt: 2 }}>Tidak Ada Data</Box>
    </StyledGridOverlay>
  );
}

/**
 * ================================
 *   MAIN COMPONENT
 * ================================
 */

/**
 * @param {CustomDataTableProps} props
 */
const CustomDataTable = ({
  rows = [],
  columns = [],
  checkbox = false,
  pageSize = 5,
  pagination = true,
  toolbar = {
    search: true,
    export: { xlsx: true, csv: true },
    import: { xlsx: true, csv: true },
    column: true,
    density: true,
  },
  loading = false,
  onSelectedRowsChange = () => {},
  isRowSelectable = () => true,
  getRowId = (row) => row.id,
}) => {
  /** @type {[GridRowSelectionModel, Function]} */
  const [rowSelectionModel, setRowSelectionModel] = useState({
    type: 'include',
    ids: new Set(),
  });

  // Emit selected data to parent when changed
  useEffect(() => {
    const selectedIds = [...rowSelectionModel.ids];
    const selectedItems = rows.filter((item) => selectedIds.includes(getRowId(item)));
    onSelectedRowsChange(selectedIds, selectedItems);
  }, [rowSelectionModel, rows]);

  return (
    <DataGrid
      getRowId={getRowId}
      rows={rows}
      columns={columns}
      loading={loading}
      checkboxSelection={checkbox}
      disableRowSelectionOnClick
      isRowSelectable={isRowSelectable}
      // rowSelectionModel={[...rowSelectionModel.ids]}
      // onRowSelectionModelChange={(ids) =>
      //   setRowSelectionModel({
      //     type: 'include',
      //     ids: new Set(ids),
      //   })
      // }
      {...(pagination && {
        pageSizeOptions: [5, 10, 25, 50, 100],
        initialState: {
          pagination: {
            paginationModel: { pageSize },
          },
        },
      })}
      slots={{
        noRowsOverlay: CustomNoRowsOverlay,
        noResultsOverlay: CustomNoRowsOverlay,
      }}
      showCellVerticalBorder
      showToolbar
    />
  );
};

export default CustomDataTable;
