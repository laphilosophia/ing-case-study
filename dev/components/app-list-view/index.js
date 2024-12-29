import {
  TableController,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
} from '@tanstack/lit-table';
import '@vaadin/icons/vaadin-icons';
import {html, nothing} from 'lit';
import {ifDefined} from 'lit/directives/if-defined.js';
import {repeat} from 'lit/directives/repeat.js';
import {until} from 'lit/directives/until.js';
import {paginationStyles} from '../../styles/pagination.css';
import {Database} from '../../utils/db.controller';
import {LitElementI18N, t} from '../../utils/i18n.mixins';
import '../app-dialog';
import {appListViewTableStyles} from './styles';

export class AppListView extends LitElementI18N {
  // @ts-ignore
  tableController = new TableController(this);
  db = new Database(this);

  rowSelection = {};
  selected = null;
  modals = null; // 'edit' | 'delete'

  static properties = {
    data: {
      type: Array,
      reflect: true,
    },
  };

  static styles = [appListViewTableStyles, paginationStyles];

  constructor(data) {
    super();
    this.data = data;
  }

  _openModal(id, modal) {
    this.modals = modal;
    this.selected = id;

    this.requestUpdate();
  }

  _closeModal() {
    this.modals = null;
    this.selected = null;

    this.requestUpdate();
  }

  async _deleteRow() {
    if (!this.selected) {
      return;
    }

    const has = await this.db.get(this.selected);
    if (!has) {
      return;
    }

    await this.db.del(this.selected);

    this._closeModal();

    window.location.reload();
  }

  async _getEmployee() {
    return await this.db.get(this.selected);
  }

  async _getSelectedEmployee() {
    let name = null;

    const employee = await this._getEmployee();
    if (!employee) {
      name = null;
    }

    name = `${employee.firstName} ${employee.lastName ?? ''}`;

    return name;
  }

  render() {
    const table = this.tableController.table({
      data: this.data,
      columns: [
        {
          id: 'select',
          header: ({table}) => html`
            <input
              type="checkbox"
              @change="${table.getToggleAllRowsSelectedHandler()}"
              .checked="${table.getIsAllRowsSelected()}"
              .indeterminate="${table.getIsSomeRowsSelected()}"
            />
          `,
          cell: ({row}) => html`
            <input
              type="checkbox"
              @change="${row.getToggleSelectedHandler()}"
              .checked="${row.getIsSelected()}"
              ?disabled="${!row.getCanSelect()}"
              .indeterminate="${row.getIsSomeSelected()}"
            />
          `,
        },
        {
          accessorKey: 'firstName',
          header: t('messages:fields.firstName'),
        },
        {
          accessorKey: 'lastName',
          header: t('messages:fields.lastName'),
        },
        {
          accessorKey: 'dateOfEmployment',
          header: t('messages:fields.employmentDate'),
          cell: (info) =>
            new Intl.DateTimeFormat('en-US', {
              year: 'numeric',
              month: '2-digit',
              day: '2-digit',
            }).format(new Date(info.getValue())),
        },
        {
          accessorKey: 'dateOfBirth',
          header: t('messages:fields.birthday'),
          cell: (info) =>
            new Intl.DateTimeFormat('en-US', {
              year: 'numeric',
              month: '2-digit',
              day: '2-digit',
            }).format(new Date(info.getValue())),
        },
        {
          accessorKey: 'phone',
          header: t('messages:fields.phone'),
        },
        {
          accessorKey: 'email',
          header: t('messages:fields.email'),
        },
        {
          accessorKey: 'department',
          header: t('messages:fields.department'),
        },
        {
          accessorKey: 'position',
          header: t('messages:fields.position'),
        },
        {
          accessorKey: 'actions',
          header: t('messages:fields.actions'),
          cell: ({row}) => {
            return html`
              <nav>
                <app-icon-button
                  .icon="${'vaadin:edit'}"
                  @click=${() =>
                    this._openModal(
                      // @ts-ignore
                      row.original.id,
                      'edit'
                    )}
                ></app-icon-button>
                <app-icon-button
                  .icon="${'vaadin:trash'}"
                  @click=${() =>
                    this._openModal(
                      // @ts-ignore
                      row.original.id,
                      'delete'
                    )}
                ></app-icon-button>
              </nav>
            `;
          },
        },
      ],
      state: {
        // @ts-ignore
        rowSelection: this.rowSelection,
      },
      enableRowSelection: true,
      debugTable: true,
      onRowSelectionChange: (updaterOrValue) => {
        if (typeof updaterOrValue === 'function') {
          // @ts-ignore
          this.rowSelection = updaterOrValue(this.rowSelection);
        } else {
          this.rowSelection = updaterOrValue;
        }
      },
      getCoreRowModel: getCoreRowModel(),
      getFilteredRowModel: getFilteredRowModel(),
      getPaginationRowModel: getPaginationRowModel(),
    });

    return html`
      <section>
        <table>
          <thead>
            ${repeat(
              table.getHeaderGroups(),
              (headerGroup) => headerGroup.id,
              (headerGroup) => html`
                <tr>
                  ${repeat(
                    headerGroup.headers,
                    (header) => header.id,
                    (header) => html`
                      <th colspan="${header.colSpan}" scope="col">
                        ${header.isPlaceholder
                          ? null
                          : html`<div>
                              ${flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )}
                            </div>`}
                      </th>
                    `
                  )}
                </tr>
              `
            )}
          </thead>
          <tbody>
            ${table
              .getRowModel()
              .rows.slice(0, 9)
              .map(
                (row) => html`
                  <tr>
                    ${row
                      .getVisibleCells()
                      .map(
                        (cell, index) => html`
                          <td
                            scope="${ifDefined(index !== 0 ? 'row' : nothing)}"
                            data-label="${ifDefined(
                              index !== 0
                                ? cell.column.columnDef.header
                                : nothing
                            )}"
                          >
                            ${flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                            )}
                          </td>
                        `
                      )}
                  </tr>
                `
              )}
          </tbody>
        </table>

        <div class="pagination">
          <button
            @click=${() => table.setPageIndex(0)}
            ?disabled="${!table.getCanPreviousPage()}"
          >
            <<
          </button>
          <button
            @click=${() => table.previousPage()}
            ?disabled=${!table.getCanPreviousPage()}
          >
            <
          </button>

          <div>
            <span>Page</span>
            <strong>
              ${table.getState().pagination.pageIndex + 1} of
              ${Math.floor(this.data.length / 9)}
            </strong>
          </div>

          <button
            @click=${() => table.nextPage()}
            ?disabled=${!table.getCanNextPage()}
          >
            >
          </button>
          <button
            @click=${() => table.setPageIndex(table.getPageCount() - 1)}
            ?disabled="${!table.getCanNextPage()}"
          >
            >>
          </button>
        </div>

        ${this.modals === 'delete' && this.selected
          ? html`
              <app-dialog
                .title="${t('messages:dialogs.delete.title')}"
                @dialog-close="${() => this._closeModal()}"
                @dialog-submit="${async () => await this._deleteRow()}"
              >
                ${until(
                  this._getSelectedEmployee().then(
                    (name) =>
                      html`${t('messages:dialogs.delete.content', {
                        employee: name,
                      })}`
                  )
                )}
              </app-dialog>
            `
          : nothing}
        ${this.modals === 'edit' && this.selected
          ? html`
              <app-dialog
                .withForm="${true}"
                .title="${t('messages:titles.editEmployee')}"
                @dialog-close="${() => this._closeModal()}"
                @dialog-submit="${async () => await this._deleteRow()}"
              >
                <app-employee-form
                  .selected="${this.selected}"
                  @dialog-close="${() => this._closeModal()}"
                ></app-employee-form>
              </app-dialog>
            `
          : nothing}
      </section>
    `;
  }
}
// @ts-ignore
customElements.define('app-list-view', AppListView);
